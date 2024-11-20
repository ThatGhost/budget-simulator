import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public headerTitleSubject: Subject<string> = new Subject<string>();
  public hideHeader: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  public ChangeHeaderName(header: string) {
    this.headerTitleSubject.next(header);
  }

  public HideHeader(hide: boolean) {
    this.hideHeader.next(hide);
  }
}
