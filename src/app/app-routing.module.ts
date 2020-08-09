import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './shared/auth.guard';
import { notAuthGuard } from './shared/notauth.guard';
import { RolesComponent } from './roles/roles.component';
import { RolesLayoutComponent } from './layouts/roles-layout/roles-layout.component';
import { CategoryComponent } from './category/category.component';
import { CategoryLayoutComponent } from './layouts/category-layout/category-layout.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryLayoutComponent } from './layouts/inventory-layout/inventory-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginLayoutComponent,
    children: [{
      path: '',
      component: LoginComponent,
      canActivate: [notAuthGuard]
    }]
  },
  { path: 'dashboard', component: DashboardLayoutComponent,
    children: [{
      path: '',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    }]
  },
  { path: 'users', component: UserLayoutComponent,
    children: [{
      path: '',
      component: UsersComponent,
      canActivate: [AuthGuard]
    }]
  },
  { path: 'roles', component: RolesLayoutComponent,
    children: [{
      path: '',
      component: RolesComponent,
      canActivate: [AuthGuard]
    }]
  },
  { path: 'category', component: CategoryLayoutComponent,
    children: [{
      path: '',
      component: CategoryComponent,
      canActivate: [AuthGuard]
    }]
  },
  { path: 'inventory', component: InventoryLayoutComponent,
    children: [{
      path: '',
      component: InventoryComponent,
      canActivate: [AuthGuard]
    }]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },         
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
