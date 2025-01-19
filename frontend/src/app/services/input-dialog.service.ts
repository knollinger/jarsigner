import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { InputDialogComponent } from '../components/input-dialog/input-dialog.component';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  /**
   * 
   * @param dialog 
   */
  constructor(private dialog: MatDialog) {
  }

  /**
   * 
   * @param title 
   * @param label 
   * @param value 
   * @returns 
   */
  public showInputDialog(
    title: string, 
    label: string, 
    value?: string): Observable<string> {

    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: {
        title: title,
        label: label,
        value: value
      }
    });
    return dialogRef.afterClosed();
  }
}
