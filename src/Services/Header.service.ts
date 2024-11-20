import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public headerTitleSubject: Subject<string> = new Subject<string>();
  public hideHeader: Subject<boolean> = new Subject<boolean>();
  public hideFooter: Subject<boolean> = new Subject<boolean>();
  public playAnimation: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  public ChangeHeaderName(header: string) {
    this.headerTitleSubject.next(header);
  }

  public HideHeader(hide: boolean) {
    this.hideHeader.next(hide);
  }

  public HideFooter(hide: boolean) {
    this.hideFooter.next(hide);
  }

  public PlayAnimation(play: boolean) {
    this.playAnimation.next(play);
  }
}
