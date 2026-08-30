import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
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
  ]
  categories: string[] = [];

  searchControl = new FormControl('');
  categoryControl = new FormControl('all');

  ngOnInit() {
    this.books = this.booksService.getAllBooks();
    this.filteredBooks = this.books;
    this.categories = [...new Set(this.books.map(b => b.category))];

    this.searchControl.valueChanges.subscribe(() => this.filterBooks());
    this.categoryControl.valueChanges.subscribe(() => this.filterBooks());
  }

  private filterBooks() {
    const search = this.searchControl.value?.toLowerCase().trim() ?? '';
    const category = this.categoryControl.value;

    this.filteredBooks = this.books.filter(book => {
      const matchesSearch =
        !search || book.title.toLowerCase().includes(search);

      const matchesCategory =
        category === 'all' || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }
}
