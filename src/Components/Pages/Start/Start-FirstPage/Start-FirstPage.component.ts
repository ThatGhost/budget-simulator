import { Component } from '@angular/core';
import { AppService } from '../../../../Services/header.service';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Start-FirstPage',
  templateUrl: './Start-FirstPage.component.html',
  styleUrls: ['./Start-FirstPage.component.scss'],
  imports: [ButtonRoundComponent, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule]
})
export class StartFirstPageComponent {
  public ageIsNumber: boolean | null = null; 

  constructor(private readonly appService: AppService) {
  }

  ngOnInit() {
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName("Basic information");
  }

  public OnNext(name: string, country: string, age: string, status: string) {
    if(!this.CanClickNext(name, country, age, status)) return;
  }

  public CanClickNext(name: string, country: string, age: string, status: string): boolean {
    return !!name && !!country && !!age && !!status && this.ageIsNumber === true;
  }

  public IsNumber(numb: string) {
    this.ageIsNumber = !isNaN(parseInt(numb));
    console.log(this.ageIsNumber);
  }

}
