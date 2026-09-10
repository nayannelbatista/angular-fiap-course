import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Book } from '../book';
import { BooksService } from '../books.service';
import { BookFilter } from "../book-filter/book-filter";
import { BookTable } from '../book-table/book-table';
import { BooksState } from '../books-state';

@Component({
  selector: 'app-book-list-page',
  imports: [
    BookFilter,
    BookTable
],
  templateUrl: './book-list-page.html',
  styleUrl: './book-list-page.scss',
})
export class BookListPage implements OnInit {
  private booksState = inject(BooksState);

  books = signal<Book[]>([]);
  categories = computed(() => [...new Set(this.booksState.books().map(b => b.category))]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('all');

  ngOnInit() {
    this.booksState.loadBooks();
  }

  readonly filteredBooks = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();
    return this.booksState.books().filter(book => {
      const matchesSearch =
        !search || book.title.toLowerCase().includes(search);
      const matchesCategory =
        category === 'all' || book.category === category;
      return matchesSearch && matchesCategory;
    });
  })
}
