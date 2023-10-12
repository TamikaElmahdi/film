import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = 'VOTRE_CLE_API_TMDB';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    const url = `${this.apiUrl}/movie/popular`;
    const params = {
      api_key: this.apiKey
    };

    return this.http.get(url, { params });
  }
}
