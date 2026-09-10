import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BooksState } from '../../books/books-state';

@Component({
  selector: 'app-loans',
  imports: [MatCardModule],
  templateUrl: './loans.html',
  styleUrl: './loans.scss',
})
export class Loans {
  booksState = inject(BooksState);
  selectedBookId = signal('');

  constructor() {
    this.booksState.loadBooks();
  }

  selectBook(id: string) {
    this.selectedBookId.set(id);
  }

  registerLoan() {
    const id = this.selectedBookId();
    if (!id) return;

    this.booksState.toggleAvailability(id);
    this.selectedBookId.set('');
  }

}
