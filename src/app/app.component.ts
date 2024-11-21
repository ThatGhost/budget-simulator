import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from '../Services/header.service';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { SQLiteService } from '../Services/sqlite.service';
import { MigrationService } from '../Services/migration.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
          optional: true,
        }),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(-100%)' })),
          ], { optional: true }),
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('300ms ease-out', style({ transform: 'translateX(0%)' })),
          ], { optional: true }),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  public headerTitle: string = 'Hello';
  public hideHeader: boolean = false;
  public hideFooter: boolean = false;
  public swipingAnimation: boolean = false;

  public constructor(
    appService: AppService, 
    cdr: ChangeDetectorRef, 
    private readonly sqliteService: SQLiteService,
    private readonly migrationService: MigrationService
  ) {
    appService.headerTitleSubject.subscribe((newHeader) => {this.headerTitle = newHeader; cdr.detectChanges();});
    appService.hideHeader.subscribe((hide) => {this.hideHeader = hide; cdr.detectChanges()});
    appService.hideFooter.subscribe((hide) => {this.hideFooter = hide; cdr.detectChanges()});
    appService.playAnimation.subscribe((play) => {this.swipingAnimation = play; cdr.detectChanges()});
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  async ngOnInit() {
    try {
      await this.sqliteService.initializeWebPlugin();
      await this.sqliteService.createConnection();
      await this.migrationService.RunMigrations();
    } catch (error) {
      console.error('SQLite error:', error);
    }
  }
}
