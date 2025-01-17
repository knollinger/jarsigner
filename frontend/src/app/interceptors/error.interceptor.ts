import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, timer, retry } from 'rxjs';

import { MessageBoxService } from '../services/message-box.service';
import { Router } from '@angular/router';

/**
 * Der Error-Interceptor springt bei allen HttpErrorResponses an und zeigt
 * einen Fehler mittels des **MessageBoxService** an. 
 * 
 * Wenn im Bodx ein JSON-Objekt mit der eigenschafft "message" geliefert wird, 
 * so wird diese angezeigt. Anderenfalls generiert der Interceptor eine mehr
 * oder weniger schöne Meldung mit dem HTTP-Statuscode.
 * 
 * Sollte der HTTP-Status auf eine fehlende Authentifizierung hin weisen (HTTP 401)
 * sor wird auf die Login-Page redirected.
 * 
 * Keinesfalls kommt die Error-Situation beim Aufrufer des Angular-HTTPClients an. 
 * Dort kann also immer vom alles-ist-prima-Fall ausgegangen werden. Im Fall des
 * Falles kommt halt aus dem HTTP-Client keine Antwort :-)
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  /**
   *
   */
  constructor(
    private router: Router,
    private msgService: MessageBoxService) {
  }

  /**
   *
   * @param req der HttpRequest
   * @param next der nächste HttpHandler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((err: any) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

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
    if (err.status === 0) {
      return 'Die Verbindung mit dem Server konnte nicht hergestellt werden.';
    }
    return `Der Server antwortete mit dem Status-Code ${err.status}\n${err.statusText}`;
  }
}
