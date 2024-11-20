import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderService } from '../Services/Header.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public headerTitle: string = 'Hello';
  public hideHeader: boolean = false;
  public hideFooter: boolean = true;

  public constructor(headerService: HeaderService) {
    headerService.headerTitleSubject.subscribe((newHeader) => this.headerTitle = newHeader);
    headerService.hideHeader.subscribe((hide) => this.hideHeader = hide);
  }
}
