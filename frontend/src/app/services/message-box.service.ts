import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageBoxComponent } from '../components/message-box/message-box.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  /**
   *
   * @param messageBox
   */
  constructor(private messageBox: MatDialog) {

  }

  /**
    *
    * @param msgTitle
    * @param msg
    * @returns
    */
  public showInfoBox(msgTitle: string, msg: string): Observable<boolean> {

    return this.showMsgBox(msgTitle, msg, 'info');
  }

  /**
      *
      * @param msgTitle
      * @param msg
      * @returns
      */
  public showErrorBox(msgTitle: string, msg: string): Observable<boolean> {

    return this.showMsgBox(msgTitle, msg, 'error');
  }

  /**
   *
   * @param msgTitle
   * @param msg
   * @returns
   */
  public showQueryBox(msgTitle: string, msg: string): Observable<boolean> {

    return this.showMsgBox(msgTitle, msg, 'query');
  }

  /**
   *
   * @param msgTitle
   * @param msg
   * @param type
   * @returns
   */
  private showMsgBox(msgTitle: string, msg: string, type: string): Observable<boolean> {

    const dialogRef = this.messageBox.open(MessageBoxComponent, {
      width: '80%',
      maxWidth: '800px',
      data: {
        title: msgTitle,
        msg: msg,
        type: type
      }
    });
    return dialogRef.afterClosed();
  }
}
