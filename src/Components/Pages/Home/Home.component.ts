import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../Services/Header.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { 

  public constructor(private readonly router: Router,
    private readonly appService: AppService
  ) {

  }

  ngOnInit() {
    this.appService.PlayAnimation(false);
    this.router.navigate(["start"]);
  }
}
