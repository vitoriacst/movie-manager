import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MoviesList } from '../../../../shared/components/movies-list/movies-list';
import { MoviesFilter } from '../../components/movies-filter/movies-filter';
import { MoviesApi } from '../../services/movies-api';

@Component({
  selector: 'app-explore-movies',
  imports: [MoviesList, MoviesFilter],
  templateUrl: './explore-movies.html',
  styleUrl: './explore-movies.css',
})
export class ExploreMovies {
  private readonly _moviesApi = inject(MoviesApi);

  movieTitleFilter = signal('');

  movieCategoryFilter = signal('');

  movies = signal([{}]);

  moviesResource = rxResource({
    params: () => true,
    stream: () => this._moviesApi.getMovies(),
  });

  moviesFiltered = linkedSignal(() => {
    const moviesList = this.moviesResource.value() ?? [];
    const ERROR_ON_RESPONSE = !!this.moviesResource.error();

    if (ERROR_ON_RESPONSE) return [];

    const titleSearch = this.movieTitleFilter().toLocaleLowerCase().trim();

    const categorySearch = this.movieCategoryFilter().toLocaleLowerCase().trim();

    if (!titleSearch && !categorySearch) {
      return moviesList;
    }

    return moviesList.filter((movie) => {
      const matchedTitle = movie.titulo.toLocaleLowerCase().includes(titleSearch);
      const matchedCategory = movie.genero.toLocaleLowerCase().includes(categorySearch);

      return matchedTitle && matchedCategory;
    });
  });

  adicionarFilme() {}
}
