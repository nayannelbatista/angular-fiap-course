import { Injectable } from '@angular/core';
import { BOOKS_MOCK } from './books.mock';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  getAllBooks(): Book[] {
    return BOOKS_MOCK;
  }
}
