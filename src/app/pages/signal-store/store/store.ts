import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { Book, Movie } from '../interfaces';
import { BooksService } from '../services/books.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MoviesService } from '../services/movies.service';

export interface StoreState {
  books: Book[];
  movies: Movie[];
  isLoadingBooks: boolean;
  isLoadingMovies: boolean;
}

const initialState: StoreState = {
  books: [],
  movies: [],
  isLoadingBooks: false,
  isLoadingMovies: false,
};

export const Store = signalStore(
  withState<StoreState>(initialState),
  withProps(() => ({
    booksService: inject(BooksService),
    moviesService: inject(MoviesService),
  })),
  withMethods(({ booksService, moviesService, ...store }) => ({
    loadBooks: rxMethod<void>(
      switchMap(() => {
        patchState(store, { isLoadingBooks: true });
        return booksService.getBooks().pipe(
          tap(books => {
            console.log('Books loaded successfully', books);
            patchState(store, { books });
          }),
          catchError(error => {
            console.error('Error loading books', error);
            // Handle error (e.g., set an error state)
            return of(null); // Return an observable to complete the chain
          }),
          finalize(() => {
            patchState(store, { isLoadingBooks: false });
          }),
        );
      }),
    ),
    loadMovies: rxMethod<void>(
      switchMap(() => {
        patchState(store, { isLoadingMovies: true });
        return moviesService.getMovies().pipe(
          tap(movies => {
            console.log('Movies loaded successfully', movies);
            patchState(store, { movies });
          }),
          catchError(error => {
            console.error('Error loading movies', error);
            return of(null);
          }),
          finalize(() => {
            patchState(store, { isLoadingMovies: false });
          }),
        );
      }),
    ),
    coverImageUrl(coverId: number | undefined): string {
      if (!coverId) {
        return 'assets/no-cover.png';
      }
      return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    },
  })),
  withHooks({
    onInit() {
      console.log('Store initialized');
    },
  }),
);
