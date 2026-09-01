import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { Book } from '../book';

@Component({
  selector: 'app-book-table',
  imports: [
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './book-table.html',
  styleUrl: './book-table.scss',
})
export class BookTable {
    books = input.required<Book[]>();
    displayedColumns = [
      'title',
      'authorship',
      'category',
      'isbn',
      'status'
    ]
}
