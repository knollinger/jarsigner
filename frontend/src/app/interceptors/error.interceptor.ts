import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, timer, retry } from 'rxjs';

import { MessageBoxService } from '../services/message-box.service';
import { SpinnerService } from '../services/spinner.service';

/**
 * Der Error-Interceptor springt bei allen HttpErrorResponses an und zeigt
 * den Fehler als Snackbar an. Dazu muss im Body ein JSONObject mit
 * folgenden Werten geliefert werden:
 * <pre>
 * {
 *     message: Die anzuzeigende message
 * }
 * </pre>
*/
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * Wir brauchen hier leider eine statische Referenz, da diese aus der
   * delay()-Funktion der retryConfig gerufen werden muss.
   * 
   * delay() wird aber asynchron verwendet, der this-Pointer ist in diesem
   * Kontext nicht gesetzt.
   */
  public static spinnerSvc: SpinnerService | undefined = undefined;

  /**
   *
   */
  constructor(
    private spinnerSvc: SpinnerService,
    private msgService: MessageBoxService) {

      ErrorInterceptor.spinnerSvc = this.spinnerSvc;
  }

  /**
   * Der interceptor. Sollte ein HTTP-Fehler diagnostiziert werden, so wird dieser
   * als BottomSheet angezeigt. Falls in der ErrorMessage  ein JSON-Objekt mit
   * einem Member "message" existieren, so wird diese Meldung angezeigt.
   *
   * @param req der HttpRequest
   * @param next der nächste HttpHandler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((err: any) => {

        const msg = this.extractErrorMessage(err);
        this.msgService.showErrorBox('Fehler beim Zugriff auf den Server', msg);
        return throwError(err);
      })
    );
  }

  /**
   *
   * @param err
   * @returns
   */
  private extractErrorMessage(err: HttpErrorResponse): string {

    if (err.message && err.error.message) {
      return err.error.message;
    }
    if(err.status === 0) {
      return 'Die Verbindung mit dem Server konnte nicht hergestellt werden.';
    }
    return `Der Server antwortete mit dem Status-Code ${err.status}\n${err.statusText}`;
  }
}
