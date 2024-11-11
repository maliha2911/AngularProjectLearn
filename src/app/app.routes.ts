import { Routes } from '@angular/router';
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'public-info',
    loadComponent: () => import('./public-info/public-info.component').then(m => m.PublicInfoComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'login' }

];