import { Component } from '@angular/core';
import { AppService } from '../../../../Services/Header.service';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Start-Welcome',
  templateUrl: './Start-Welcome.component.html',
  styleUrls: ['./Start-Welcome.component.scss'],
  imports: [ButtonRoundComponent]
})
export class StartWelcomeComponent {

  constructor(
    readonly appService: AppService,
    private readonly router: Router,
  ) {
    appService.ChangeHeaderName("Lets start");
    appService.HideHeader(true);
    appService.HideFooter(true);
    this.appService.PlayAnimation(true);
  }

  public onStartSetup() {
    this.router.navigate(["start", "first"]);
  }
}
