import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlebarService {

  private static mainTitle: string = 'Anderls JAR Signer';
  public title: BehaviorSubject<string> = new BehaviorSubject<string>(TitlebarService.mainTitle);

  /**
   * 
   */
  constructor() { }

  /**
   * 
   * @param val 
   */
  public set subTitle(val: string) {

    let result = TitlebarService.mainTitle;
    if (val) {
      result += ' - ';
      result += val;
    }
    this.title.next(result);
  }
}
