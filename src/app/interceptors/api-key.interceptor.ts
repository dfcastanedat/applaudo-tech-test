import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiKey implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req = request.clone({
      setParams: {
        // apikey: getHash(
        //   environment.ts.toString(),
        //   environment.privateKey,
        //   environment.publicKey
        // ),
        apikey: '0ee078fbc695d12c8e7cc9fea227375a',
      },
    });

    console.log('Intercepted api call', req);

    return next.handle(req);
  }
}
