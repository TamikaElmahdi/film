import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = '0a04bedff6aab9c681cd791a0c5ea378';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    const url = `${this.apiUrl}/movie/popular`;
    const params = {
      api_key: this.apiKey
    };

    return this.http.get(url, { params });
  }


  searchMovies(query: string) {
    const url = `${this.apiUrl}/search/movie`;
    const params = {
      api_key: this.apiKey,
      query
    };

    return this.http.get(url, { params });
  }


  getMovieDetails(movieId: string) {
    const url = `${this.apiUrl}/movie/${movieId}`;
    const params = {
      api_key: this.apiKey
    };
    console.error(url)


    return this.http.get(url, { params });
  }



  getFavoriteMoviesDetails(movieIds: string[]): Observable<any[]> {
    const movieRequests: Observable<any>[] = [];
    movieIds.forEach(id => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`;
      movieRequests.push(this.http.get(url));
    });
    return forkJoin(movieRequests);
  }


}
