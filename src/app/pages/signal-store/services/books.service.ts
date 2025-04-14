import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'https://openlibrary.org/search.json?q=subject:fiction&limit=10';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<{ docs: any[] }>(this.apiUrl).pipe(
      map(response =>
        response.docs.map(doc => ({
          id: doc.key,
          title: doc.title,
          author: doc.author_name ? doc.author_name.join(', ') : 'Unknown Author',
          cover_i: doc.cover_i,
        })),
      ),
    );
  }
}
