import { Component, computed, inject, OnInit } from '@angular/core';
import { BooksState } from '../../books/books-state';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  readonly booksState = inject(BooksState);

  ngOnInit() {
    this.booksState.loadBooks();
  }

  readonly availabilityChart = computed(() => {
    const percent = this.booksState.availabilityStats().availablePercent;

    return `conic-gradient(
    #4f46e5 0% ${percent}%,
    #e2e8f0 ${percent}% 100%
  )`;
  });
}
