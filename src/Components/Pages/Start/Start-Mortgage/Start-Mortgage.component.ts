import { ChangeDetectorRef, Component } from '@angular/core';
import { AppService } from '../../../../Services/header.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';
import { DebtService, DebtType, MortgageType } from '../../../../Services/Debt.service';

@Component({
  selector: 'app-Start-Mortgage',
  templateUrl: './Start-Mortgage.component.html',
  styleUrls: ['./Start-Mortgage.component.scss'],
  imports: [ButtonRoundComponent, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule]
})
export class StartMortgageComponent {

  constructor(
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly debtService: DebtService,
    private readonly cdr: ChangeDetectorRef, 
  )
  {

  }

  async ngOnInit() {
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName(`Mortgage Details`);
    this.cdr.detectChanges();
  }

  public async OnNext(type: string, total: string, interest: string, time: string, payedOff: string) {
    if(!this.CanClickNext(type, total, interest, time, payedOff)) return;

    await this.debtService.AddDebt(true, parseInt(total), parseFloat(interest), parseInt(time), parseInt(payedOff), type as MortgageType);
    this.router.navigate([""]);
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
