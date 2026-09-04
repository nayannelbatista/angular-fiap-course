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
  filteredBooks = signal<Book[]>([]);
  categories = signal<string[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('all');

  onSearchChange(value: string) {
    this.searchTerm.set(value);
    this.updateFilteredBooks();
  }

  onCategoryChange(value: string) {
    this.selectedCategory.set(value);
    this.updateFilteredBooks();
  }

  ngOnInit() {
    const books = this.booksService.getAllBooks();
    this.books.set(books);
    this.categories.set([...new Set(this.books().map(b => b.category))]);
  }

  private updateFilteredBooks() {
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();

    const result = this.books().filter(book => {
      const matchesSearch =
        !search || book.title.toLowerCase().includes(search);

      const matchesCategory =
        category === 'all' || book.category === category;

      return matchesSearch && matchesCategory;
    });

    this.filteredBooks.set(result);
  }
}
