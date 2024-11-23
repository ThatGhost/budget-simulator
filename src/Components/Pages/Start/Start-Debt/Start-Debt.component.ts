import { Component } from '@angular/core';
import { AppService } from '../../../../Services/header.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';

@Component({
  selector: 'app-Start-Debt',
  templateUrl: './Start-Debt.component.html',
  styleUrls: ['./Start-Debt.component.scss'],
  imports: [ButtonRoundComponent, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule]
})
export class StartDebtComponent {

  constructor(
    private readonly appService: AppService,
    private readonly router: Router,
  )
  {

  }

  async ngOnInit() {
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName(`Debt Details`);
  }

  public async OnNext(type: string, total: string, interest: string, time: string) {
    if(!this.CanClickNext(type, total, interest, time)) return;

    this.router.navigate([""]);
  }

  public CanClickNext(type: string, total: string, interest: string, time: string): boolean {
    return !!type && !!total && !!interest && !!time && this.IsNumber(total) && this.IsFloat(interest) && this.IsNumber(time);
  }

  public IsNumber(numb: string): boolean {
    return numb === "" || !isNaN(parseInt(numb));
  }

  public IsFloat(numb: string): boolean {
    return numb === "" || !isNaN(parseFloat(numb));
  }
}
