import { ChangeDetectorRef, Component } from '@angular/core';
import { AppService } from '../../../../Services/header.service';
import { ButtonRoundComponent } from '../../../Standalone/Button-Round/Button-Round.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Country, UserService, UserStatus } from '../../../../Services/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Start-FirstPage',
  templateUrl: './Start-FirstPage.component.html',
  styleUrls: ['./Start-FirstPage.component.scss'],
  imports: [ButtonRoundComponent, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule]
})
export class StartFirstPageComponent {
  public isAgeNumber = true;

  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef, 
  ) {
  }

  async ngOnInit() {
    this.appService.HideHeader(false);
    this.appService.HideFooter(true);
    this.appService.PlayAnimation(true);
    this.appService.ChangeHeaderName("Basic information");
    this.cdr.detectChanges();
  }

  public async OnNext(name: string, country: string, age: string, status: string) {
    if(!this.CanClickNext(name, country, age, status)) return;
    await this.userService.updateUserData(name, country as Country, parseInt(age), status as UserStatus);
    this.router.navigate(["start", "finances"])
  }

  public CanClickNext(name: string, country: string, age: string, status: string): boolean {
    return !!name && !!country && !!age && !!status && this.IsNumber(age);
  }

  public IsNumber(numb: string): boolean {
    const parsed = parseInt(numb)
    return numb === "" || (!isNaN(parsed) && parsed > 0);
  }

}
