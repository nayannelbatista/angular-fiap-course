import { Routes } from '@angular/router';
import { Shell } from './shell/shell';
import { BookListPage } from './books/book-list-page/book-list-page';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'books', component: BookListPage },
    ],
  }
];
