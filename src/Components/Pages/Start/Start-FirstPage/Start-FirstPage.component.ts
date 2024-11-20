import { Component } from '@angular/core';
import { AppService } from '../../../../Services/Header.service';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';

@Component({
  selector: 'app-Start-FirstPage',
  templateUrl: './Start-FirstPage.component.html',
  styleUrls: ['./Start-FirstPage.component.scss'],
  imports: [ButtonRoundComponent]
})
export class StartFirstPageComponent {

  constructor(private readonly appService: AppService) {
  }

  ngOnInit() {
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName("Basic information");
  }
}
