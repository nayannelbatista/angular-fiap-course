import { Component, inject, OnInit } from '@angular/core';
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

  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories: string[] = [];

  searchTerm = '';
  selectedCategory = 'all';

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.filterBooks();
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.filterBooks();
  }

  ngOnInit() {
    this.books = this.booksService.getAllBooks();
    this.filteredBooks = this.books;
    this.categories = [...new Set(this.books.map(b => b.category))];
  }

  private filterBooks() {
    const search = this.searchTerm.toLowerCase().trim();
    const category = this.selectedCategory;

    this.filteredBooks = this.books.filter(book => {
      const matchesSearch =
        !search || book.title.toLowerCase().includes(search);

      const matchesCategory =
        category === 'all' || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }
}
