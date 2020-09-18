import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ShortenerService} from './shortener.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private shortenerService: ShortenerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
            this.shortenerService.httpErrorEmitter.next(errorMsg);
          }
          else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            this.shortenerService.httpErrorEmitter.next(errorMsg);
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      );
  }
}
