import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MovieService } from './movie.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
  constructor(private movieService: MovieService) {}
  id = 0




  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const movieId = route.paramMap.get('id');
    // Vérifier si movieId est non nul et non undefined
    if (movieId !== null && movieId !== undefined) {
      console.warn('kkkk',movieId)
      return this.movieService.getMovieDetails(movieId);
    } else {
      return of(null);
    }
  }
}
