import { Component } from '@angular/core';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IUser, UserService } from '../../../../Services/user.service';
import { AppService } from '../../../../Services/header.service';

@Component({
  selector: 'app-Start-FinanceBasics',
  templateUrl: './Start-FinanceBasics.component.html',
  styleUrls: ['./Start-FinanceBasics.component.scss'],
  imports: [ButtonRoundComponent, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule]
})
export class StartFinanceBasicsComponent {
  public user: IUser = { name: "", age: 0, country: "BE", status: "K"};

  constructor(
    private readonly userService: UserService,
    private readonly appService: AppService
  )
  {

  }

  async ngOnInit() {
    this.user = await this.userService.getUserData();
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName(`Hi ${this.user.name}!`);
  }

  public async OnNext(funds: string, costs: string, income: string, debt: string) {

  }

  public CanClickNext(funds: string, costs: string, income: string, debt: string): boolean {
    return !!funds && !!costs && !!income && !!debt && this.IsNumber(funds) && this.IsNumber(costs) && this.IsNumber(income);
  }

  public IsNumber(numb: string): boolean {
    return numb === "" || !isNaN(parseInt(numb));
  }
}
