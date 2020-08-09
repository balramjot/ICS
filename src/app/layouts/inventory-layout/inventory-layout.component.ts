import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-layout',
  template: `
  <div class="wrapper" id="blurBackground">
  <app-sidebar></app-sidebar>
  <div class="main-panel">
    <app-header></app-header>
      <br/><br/><br/><br/>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  </div>
</div>
  `,
  styles: [
  ]
})
export class InventoryLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
