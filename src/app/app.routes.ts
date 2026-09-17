import { Routes } from '@angular/router';
import { Shell } from './core/shell/shell';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { Login } from './users/login/login';
import { authGuard } from './users/auth-guard';
import { adminGuard } from './users/admin-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'books',
        loadChildren: () => import('./books/books.routes').then((r) => r.books_routes),
      },
      { path: 'loans',
        canActivate: [adminGuard],
        loadComponent: () => import('./loans/loans/loans').then((c) => c.Loans),
      },
    ],
  }
];
