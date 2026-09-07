import { inject, Injectable, signal } from '@angular/core';
import { Book } from './book';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root',
})
export class BooksState {
  private booksService = inject(BooksService);

  readonly books = signal<Book[]>([]);

  loadBooks() {
    const books = this.booksService.getAllBooks();
    this.books.set(books);
  }
}
