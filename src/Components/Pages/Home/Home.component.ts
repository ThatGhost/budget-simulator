import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../Services/header.service';
import { IUser, UserService } from '../../../Services/User.service';
import { MigrationService } from '../../../Services/migration.service';
import { SQLiteService } from '../../../Services/sqlite.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { 

  public constructor(
    private readonly router: Router,
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly sqliteService: SQLiteService,
    private readonly migrationService: MigrationService
  ) {
  }

  async ngOnInit() {
    await this.sqliteService.initializeWebPlugin();
    await this.sqliteService.createConnection();
    await this.migrationService.RunMigrations();

    const user: IUser = await this.userService.getUserData();
    if(user.name === "") this.router.navigate(["start"]);

    this.appService.HideHeader(false);
    this.appService.HideFooter(false);
    this.appService.PlayAnimation(false);
    this.appService.ChangeHeaderName(`Welcome back, ${user.name}`);
  }
}
