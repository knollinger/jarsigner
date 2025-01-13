import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private pendingRequests = 0;

  /*
   *
   */
  constructor(
    private spinnerService: SpinnerService) {

  }

  /**
   *
   * @param request der HTTP-Request
   * @param next der nächste Interceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.addPendingRequest();
    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.removePendingRequest();
      })
    );
  }
}
