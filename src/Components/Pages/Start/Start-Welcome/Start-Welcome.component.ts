import { Component } from '@angular/core';
import { HeaderService } from '../../../../Services/Header.service';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';

@Component({
  selector: 'app-Start-Welcome',
  templateUrl: './Start-Welcome.component.html',
  styleUrls: ['./Start-Welcome.component.scss'],
  imports: [ButtonRoundComponent]
})
export class StartWelcomeComponent {

  constructor(readonly headerService: HeaderService) {
    headerService.ChangeHeaderName("Lets start");
    headerService.HideHeader(true);
  }
}
