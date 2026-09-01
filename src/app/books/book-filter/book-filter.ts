import { Component, EventEmitter, input, output } from '@angular/core';
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
  searchTerm = input('');
  selectedCategory = input('all');
  categories = input<string[]>();

  searchChange = output<string>();
  categoryChange = output<string>();

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onCategoryChange(value: string) {
    this.categoryChange.emit(value);
  }
}
