import { Component } from '@angular/core';
import { AppService } from '../../../../Services/header.service';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IUser, UserService } from '../../../../Services/user.service';

@Component({
  selector: 'app-Start-FirstPage',
  templateUrl: './Start-FirstPage.component.html',
  styleUrls: ['./Start-FirstPage.component.scss'],
  imports: [ButtonRoundComponent, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule]
})
export class StartFirstPageComponent {
  public ageIsNumber: boolean | null = null; 
  public user: IUser = { name: "", age: 0, country: "BE", status: "K"};

  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {
  }

  async ngOnInit() {
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName("Basic information");
    this.user = await this.userService.getUserData();
    console.log(this.user);
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
