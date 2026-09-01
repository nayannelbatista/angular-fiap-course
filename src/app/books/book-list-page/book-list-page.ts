import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Book } from '../book';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list-page',
  imports: [
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './book-list-page.html',
  styleUrl: './book-list-page.scss',
})
export class BookListPage implements OnInit {
  private booksService = inject(BooksService);

  books: Book[] = [];
  filteredBooks: Book[] = [];
  displayedColumns = [
    'title',
    'authorship',
    'category',
    'isbn',
    'status'
  ];
  categories: string[] = [];

  searchTerm = '';
  selectedCategory = 'all';

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

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.filterBooks();
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.filterBooks();
  }
}
