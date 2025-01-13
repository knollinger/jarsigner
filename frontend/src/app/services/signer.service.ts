import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, map, tap, last } from 'rxjs';

import { BackendRoutingService } from './backend-routing.service';
import { SpinnerService } from './spinner.service';
import { SignJarsResponse } from '../models/sign-jar-response';


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
   */
  constructor(
    private backendRouter: BackendRoutingService,
    private httpClient: HttpClient,
    private spinner: SpinnerService) {

  }

  /**
   * 
   * @param taskId 
   * @returns 
   */
  public getTaskResultUrl(taskId: string): string {

    return this.backendRouter.getRouteForName('downloadResult', SignerService.routes, taskId);
  }

  /**
   *
   * @param files
   */
  public signFiles(files: File[]): Observable<SignJarsResponse> {

    const url = this.backendRouter.getRouteForName('signJars', SignerService.routes);

    const form = new FormData();
    // form.append('versionId', versionId);
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
