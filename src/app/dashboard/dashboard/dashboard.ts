import { Component, inject, OnInit } from '@angular/core';
import { BooksState } from '../../books/books-state';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
  readonly booksState = inject(BooksState);

  ngOnInit() {
    this.booksState.loadBooks();
  }

  get books() {
    return this.booksState.books();
  }

  get totalBooks(): number {
    return this.books.length;
  }

  get categoriesCount(): number {
    return new Set(this.books.map((b) => b.category)).size;
  }

  get availableBooks(): number {
    return this.books.filter((b) => b.available).length;
  }

  get loanedBooks(): number {
    return this.books.filter((b) => !b.available).length;
  }
}
