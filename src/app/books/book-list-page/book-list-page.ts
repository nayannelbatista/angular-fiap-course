import { Component, inject, OnInit, signal } from '@angular/core';
import { Book } from '../book';
import { BooksService } from '../books.service';
import { BookFilter } from "../book-filter/book-filter";
import { BookTable } from '../book-table/book-table';

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
  private booksService = inject(BooksService);

  books = signal<Book[]>([]);
  categories = signal<string[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('all');

  ngOnInit() {
    const books = this.booksService.getAllBooks();
    this.books.set(books);
    this.categories.set([...new Set(this.books().map(b => b.category))]);
  }

  get filteredBooks(): Book[] {
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();
    return this.books().filter(book => {
      const matchesSearch =
        !search || book.title.toLowerCase().includes(search);
      const matchesCategory =
        category === 'all' || book.category === category;
      return matchesSearch && matchesCategory;
    });
  }
}
