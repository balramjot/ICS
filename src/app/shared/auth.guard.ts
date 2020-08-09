import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BackendServiceService } from '../service/backend-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private route: Router, private backendservice: BackendServiceService) { }

canActivate(): boolean {
  if(this.backendservice.loggedIn()) {
    return true;
  } else {
    this.route.navigate(['/login']);
    return false;
}
}

}
