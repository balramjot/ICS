import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCustomMaterial } from './shared/custommaterial/custommaterial.module';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { BackendServiceService } from './service/backend-service.service';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { AuthGuard } from './shared/auth.guard';
import { notAuthGuard } from './shared/notauth.guard';
import { RolesComponent } from './roles/roles.component';
import { RolesLayoutComponent } from './layouts/roles-layout/roles-layout.component';
import { CategoryLayoutComponent } from './layouts/category-layout/category-layout.component';
import { CategoryComponent } from './category/category.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryLayoutComponent } from './layouts/inventory-layout/inventory-layout.component';
import { NewInventoryComponent } from './new-inventory/new-inventory.component';
import { CancelInventoryComponent } from './new-inventory/cancel-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    UsersComponent,
    LoginComponent,
    LoginLayoutComponent,
    UserLayoutComponent,
    DashboardLayoutComponent,
    RolesLayoutComponent,
    RolesComponent,
    CategoryLayoutComponent,
    CategoryComponent,
    InventoryComponent,
    InventoryLayoutComponent,
    NewInventoryComponent,
    CancelInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCustomMaterial,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BackendServiceService,AuthGuard,notAuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
