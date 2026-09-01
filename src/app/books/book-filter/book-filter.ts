import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-book-filter',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './book-filter.html',
  styleUrl: './book-filter.scss',
})
export class BookFilter {
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = 'all';

  onSearchChange(value: string) {
    this.searchTerm = value;
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
  }
}
