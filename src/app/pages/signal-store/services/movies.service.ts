import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl =
    'https://api.themoviedb.org/3/discover/movie?api_key=1a916d5379a530e89b01817d329d36a7&sort_by=popularity.desc&page=1';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<{ results: Movie[] }>(this.apiUrl).pipe(
      map(response =>
        response.results.map(movie => ({
          id: movie.id.toString(),
          title: movie.title,
          director: movie.director ? movie.director : 'Unknown Director',
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'assets/no-poster.png',
          overview: movie.overview,
        })),
      ),
    );
  }
}
