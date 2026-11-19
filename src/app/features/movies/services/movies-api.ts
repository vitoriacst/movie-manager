import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IMovieResponse } from '../../../shared/models/movie-response';
import { MoviesListResponse } from '../../../shared/types/movies-list-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesApi {
  private readonly _httpClient = inject(HttpClient);

  getMovies() {
    return this._httpClient.get<MoviesListResponse>(environment.baseUrl + '/movies');
  }

  getMovieDetails(id: number) {
    return this._httpClient.get<IMovieResponse>(environment.baseUrl + '/movies/' + id);
  }

  rateMovie(movieId: number, rating: number) {
    return this._httpClient.post<IMovieResponse>(
      environment.baseUrl + '/movies/' + movieId + '/rate',
      { rating },
    );
  }
  createMovie(movieData: FormData) {
    console.log(movieData, 'movieData');
    return this._httpClient.post<IMovieResponse>(environment.baseUrl + '/movies', movieData);
  }
}
