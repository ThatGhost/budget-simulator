import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-Button-Round',
  templateUrl: './Button-Round.component.html',
  styleUrls: ['./Button-Round.component.scss']
})
export class ButtonRoundComponent {
  @Input() content: string = "button";
  @Input() color: string = "#FFFFFF";
  @Input() fontColor: string = "#000000";
  @Input() fontSize: string = "3vw";
  @Output() Click = new EventEmitter<any>();

  public onClickButton(event: any) {
    this.Click.emit(event);
  }
}
