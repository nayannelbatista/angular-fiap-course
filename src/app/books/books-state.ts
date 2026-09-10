import { computed, inject, Injectable, signal } from '@angular/core';
import { Book } from './book';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root',
})
export class BooksState {
  private booksService = inject(BooksService);

  readonly books = signal<Book[]>([]);

  readonly totalBooks = computed(() => this.books().length);

  readonly categoriesCount = computed(() => new Set(this.books().map((b) => b.category)).size);

  readonly availableBooksCount = computed(() => this.books().filter((b) => b.available).length);
  readonly availableBooks = computed(() => this.books().filter((b) => b.available));

  readonly loanedBooksCount = computed(() => this.books().filter((b) => !b.available).length);
  readonly loanedBooks = computed(() => this.books().filter((b) => !b.available));

  loadBooks() {
    if (this.books().length > 0) return;
    const books = this.booksService.getAllBooks();
    this.books.set(books);
  }

  categoryStats = computed(() => {
    const counts = new Map<string, number>();

    for (const book of this.books()) {
      counts.set(book.category, (counts.get(book.category) ?? 0) + 1);
    }

    const max = Math.max(...counts.values(), 1);

    return Array.from(counts.entries()).map(([category, total]) => ({
      category,
      total,
      percentage: (total / max) * 100,
    }));
  });

  readonly availabilityStats = computed(() => {
    const total = this.totalBooks();
    const available = this.availableBooksCount();

    return {
      availablePercent: total ? Math.round((available / total) * 100) : 0,
    };
  });

  toggleAvailability(id: string) {
    this.books.update((books) =>
      books.map((b) => (b.id === id ? { ...b, available: !b.available } : b)),
    );
  }
}
