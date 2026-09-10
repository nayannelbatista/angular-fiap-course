import { Routes } from '@angular/router';
import { Shell } from './shell/shell';
import { BookListPage } from './books/book-list-page/book-list-page';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { Loans } from './loans/loans/loans';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'books', component: BookListPage },
      { path: 'dashboard', component: Dashboard },
      { path: 'loans', component: Loans },
    ],
  }
];
