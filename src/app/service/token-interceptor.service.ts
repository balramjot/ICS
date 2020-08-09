import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { BackendServiceService } from '../service/backend-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let backendservice = this.injector.get(BackendServiceService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${backendservice.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
