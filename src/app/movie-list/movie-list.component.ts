// movie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  populaireMovies: any[] = [];
  movies: any[] = [];
  searchQuery = '';
  private searchTerms = new Subject<string>();

  releaseYearFilter: number | null = null;
  genreFilter: string = '';

  likedMovies: string[] = [];

  favoriteMovies: any[] = [];

  constructor(private movieService: MovieService,private router: Router) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data: any) => {
      this.populaireMovies = data.results;
    });

     // Charger les films "likés" depuis le localStorage
     const likedMoviesString = localStorage.getItem('likedMovies');
     if (likedMoviesString) {
       this.likedMovies = JSON.parse(likedMoviesString);
     }


    this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(), // Ignorer si la valeur du terme est inchangée
      switchMap((term: string) => this.movieService.searchMovies(term))
    ).subscribe((data: any) => {
      this.movies = data.results;
    });



    const favoritesString = localStorage.getItem('favorites');
    const favorites: string[] = favoritesString ? JSON.parse(favoritesString) : [];

    if (favorites.length > 0) {
      this.movieService.getFavoriteMoviesDetails(favorites).subscribe(
        movies => {
          this.favoriteMovies = movies;
        },
        error => {
          console.error('Error fetching favorite movies:', error);
        }
      );
    }

  }

   // Méthode pour lancer la recherche
   rechercher(): void {
    this.searchTerms.next(this.searchQuery);
  }



  voirDetails(movieId: string | null): void {
    console.log('ID du film :', movieId);
    const url = ['/movie', movieId?.toString()];
    console.log('URL générée :', url);
    this.router.navigate(url);
  }


  toggleLike(movie: any): void {
    const movieId = movie.id.toString();

    if (this.isLiked(movieId)) {
      this.likedMovies = this.likedMovies.filter(id => id !== movieId);
    } else {
      this.likedMovies.push(movieId);
    }
    localStorage.setItem('likedMovies', JSON.stringify(this.likedMovies));
  }

  isLiked(movieId: string): boolean {
    return this.likedMovies.includes(movieId);
  }


  toggleFavorite(movie: any): void {
    const movieId = movie.id.toString();
    const favoritesString = localStorage.getItem('favorites');
    let favorites: string[] = [];

    if (favoritesString) {
      favorites = JSON.parse(favoritesString);
    }

    if (this.isFavorited(movieId)) {
      favorites = favorites.filter(id => id !== movieId);
    } else {
      favorites.push(movieId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  isFavorited(movieId: string): boolean {
    const favoritesString = localStorage.getItem('favorites');

    if (favoritesString) {
      const favorites: string[] = JSON.parse(favoritesString);
      return favorites.includes(movieId);
    }

    return false;
  }

  applyFilters(): void {
    this.movies = this.movies.filter(movie => {
      const matchesReleaseYear = !this.releaseYearFilter || movie.releaseYear === this.releaseYearFilter;
      const matchesGenre = !this.genreFilter || movie.genres.includes(this.genreFilter);
      return matchesReleaseYear && matchesGenre;
    });
  }


}
