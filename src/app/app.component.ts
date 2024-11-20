import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from '../Services/Header.service';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

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

  public constructor(headerService: AppService, cdr: ChangeDetectorRef) {
    headerService.headerTitleSubject.subscribe((newHeader) => {this.headerTitle = newHeader; cdr.detectChanges();});
    headerService.hideHeader.subscribe((hide) => {this.hideHeader = hide; cdr.detectChanges()});
    headerService.hideFooter.subscribe((hide) => {this.hideFooter = hide; cdr.detectChanges()});
    headerService.playAnimation.subscribe((play) => {this.swipingAnimation = play; cdr.detectChanges()});
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
