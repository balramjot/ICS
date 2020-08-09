import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServiceService } from '../service/backend-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private route: Router, private backendservice: BackendServiceService) { }

  private querySubscription;

  userLogOut(event){
    localStorage.removeItem('token');
    this.route.navigate(['/login']);    
}

  ngOnInit(): void {
  }
  
}
