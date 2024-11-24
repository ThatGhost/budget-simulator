import { ChangeDetectorRef, Component } from '@angular/core';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IUser, UserService } from '../../../../Services/User.service';
import { AppService } from '../../../../Services/header.service';
import { DebtState, MonthlyBasicFinancesService } from '../../../../Services/MonthlyBasicFinances.service';
import { Router } from '@angular/router';

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
    private readonly appService: AppService,
    private readonly monthlyBasicsFinancy: MonthlyBasicFinancesService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef, 
  )
  {

  }

  async ngOnInit() {
    this.user = await this.userService.getUserData();
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName(`Welcome ${this.user.name}!`);
    this.cdr.detectChanges();
  }

  public async OnNext(funds: string, costs: string, income: string, debt: string) {
    if(!this.CanClickNext(funds, costs, income, debt)) return;

    const debtState = debt as DebtState
    await this.monthlyBasicsFinancy.addMonthlyBasicFinances(parseInt(funds), parseInt(costs), parseInt(income), debtState);
    if(debtState === "N") {
      this.router.navigate([""]);
    }
    else if(debtState === "D" || debtState === "MD") {
      this.router.navigate(["start", "debt"]);
    }
  }

  public CanClickNext(funds: string, costs: string, income: string, debt: string): boolean {
    return !!funds && !!costs && !!income && !!debt && this.IsNumber(funds) && this.IsNumber(costs) && this.IsNumber(income);
  }

  public IsNumber(numb: string): boolean {
    const parsed = parseInt(numb)
    return numb === "" || (!isNaN(parsed) && parsed > 0);
  }
}
