import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `
      <div class="wrapper">
      <div class="main-panel-login">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styles: []
})
export class LoginLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
