import { ChangeDetectorRef, Component } from '@angular/core';
import { AppService } from '../../../../Services/header.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';
import { DebtService, DebtType } from '../../../../Services/Debt.service';
import { IUser, UserService } from '../../../../Services/User.service';
import { IBasicMonthlyFinances, MonthlyBasicFinancesService } from '../../../../Services/MonthlyBasicFinances.service';

@Component({
  selector: 'app-Start-Debt',
  templateUrl: './Start-Debt.component.html',
  styleUrls: ['./Start-Debt.component.scss'],
  imports: [ButtonRoundComponent, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule]
})
export class StartDebtComponent {
  public monthBasicFinances: IBasicMonthlyFinances = {debt: "N", fixedCosts: 0, grossIncome: 0, totalFunds: 0, month: 0, year: 0};

  constructor(
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly debtService: DebtService,
    private readonly BasicFinancesService: MonthlyBasicFinancesService,
    private readonly cdr: ChangeDetectorRef, 
  )
  {

  }

  async ngOnInit() {
    this.monthBasicFinances = (await this.BasicFinancesService.getMonthlyBasicFinances())[0];
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName(`Debt Details`);
    this.cdr.detectChanges();
  }

  public async OnNext(type: string, total: string, interest: string, time: string, payedOff: string) {
    if(!this.CanClickNext(type, total, interest, time, payedOff)) return;

    await this.debtService.AddDebt(false, parseInt(total), parseFloat(interest), parseInt(time), parseInt(payedOff), type as DebtType);
    if(this.monthBasicFinances.debt === "M" || this.monthBasicFinances.debt === "MD") this.router.navigate(["start", "mortgage"]);
    else this.router.navigate([""]);
  }

  public CanClickNext(type: string, total: string, interest: string, time: string, payedOff: string): boolean {
    return !!type && !!total && !!interest && !!time && !!payedOff && this.IsNumber(total) && this.IsFloat(interest) && this.IsNumber(time) && this.IsNumber(payedOff);
  }

  public IsNumber(numb: string): boolean {
    const parsed = parseInt(numb)
    return numb === "" || (!isNaN(parsed) && parsed > 0);
  }

  public IsFloat(numb: string): boolean {
    const parsed = parseFloat(numb)
    return numb === "" || (!isNaN(parsed) && parsed > 0);
  }
}
