import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../Services/Header.service';
import { DatabaseService } from '../../../Services/Database.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { 

  public constructor(private readonly router: Router,
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService
  ) {
  }

  async ngOnInit() {
    await this.databaseService.createConnection();
    await this.databaseService.openConnection();
    const isDbOpen = await this.databaseService.isDatabaseOpen();
    console.log(isDbOpen);
    await this.databaseService.closeConnection();

    this.appService.PlayAnimation(false);
    this.router.navigate(["start"]);
  }
}
