import { Routes } from '@angular/router';
import { Shell } from './core/shell/shell';
import { BookListPage } from './books/book-list-page/book-list-page';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { Loans } from './loans/loans/loans';
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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'books', component: BookListPage },
      { path: 'dashboard', component: Dashboard },
      { path: 'loans', component: Loans, canActivate: [adminGuard] },
    ],
  }
];
