import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, map, tap, last } from 'rxjs';

import { BackendRoutingService } from './backend-routing.service';
import { SpinnerService } from './spinner.service';
import { SignJarsResponse } from '../models/sign-jar-response';

/**
 * Die Schnitstelle zum JAR-Signatur-API des Backends.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class SignerService {

  private static routes: Map<string, string> = new Map<string, string>(
    [
      ['signJars', 'v1/signer'],
      ['downloadResult', 'v1/signer/{1}']
    ]
  );

  /**
   * 
   * @param backendRouter 
   * @param httpClient 
   * @param spinner 
   */
  constructor(
    private backendRouter: BackendRoutingService,
    private httpClient: HttpClient,
    private spinner: SpinnerService) {

  }

  /**
   * Liefere die Download-Url eines erfolgreichen Signatur-Vorgangs.
   *
   * @param taskId Die TaskId kann aus dem SignJarsResponse-Objekt
   *               aus dem Aufruf von **signFiles** entnommen werden
   * 
   * @returns Die Download-URL
   */
  public getTaskResultUrl(taskId: string): string {

    return this.backendRouter.getRouteForName('downloadResult', SignerService.routes, taskId);
  }

  /**
   * Übergebe ein Array von *File*-Objekten zur signatur durch das Backend.
   * 
   * Das ganze ist ein wenig speziell:
   * 
   * * Die Files werden in einem Stück als Multipart-Request hoch geladen
   * * Da es ein länger laufende Http-Request ist, springt der 
   * **SpinnerInterceptor** an und zeigt einen Infinite-Spinner an
   * * Ich will zwingend den Fortschritt des Uploads sehen, deswegen wird
   *   reqortProgess aus true gestellt.
   * * Der Progress selbst wird mittels dem SpinnerService visualisiert.
   * * Um Upload-Errors brauchen wir uns hier nicht kümmern, der **ErrorInterceptor**
   *   übernimmt das.
   * 
   * @param files die Jars zum signieren
   * 
   * @returns ein Observable auf ein SignJarsResponse-Objekt. Dieses
   *          liefert dann das Ergebniss des Signatur-Vorgangs.
   */
  public signFiles(files: File[]): Observable<SignJarsResponse> {

    const url = this.backendRouter.getRouteForName('signJars', SignerService.routes);

    const form = new FormData();
    files.forEach(file => {
      form.append('file', file);
    });

    const options = {
      reportProgress: true
    };

    const req = new HttpRequest('PUT', url, form, options);
    const res = this.httpClient.request(req).pipe(
      tap(event => this.handleHttpEvents(event as HttpEvent<any>)),
      last());

    return (res as Observable<HttpResponse<any>>).pipe(map(val => {
      return SignJarsResponse.fromJSON(val.body);
    }));
  }


  /**
   * 
   * @param event handleHttpUploadEvent
   * @param file
   * @returns
   */
  private handleHttpEvents(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        this.spinner.setMessage(`Beginne Upload`);
        break;

      case HttpEventType.UploadProgress:
        const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
        this.spinner.setMessage(`Upload zu  ${percentDone}% erledigt.`);
        if (percentDone >= 100) {
          this.spinner.setMessage(`Signieren...`);
        }
        break;

      case HttpEventType.Response:
        this.spinner.setMessage(`Upload abgeschlossen`);
        break;

      default:
        console.log(`unexpected upload event: ${event}.`);
        break;
    }
  }

}
