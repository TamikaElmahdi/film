import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.warn('yyyyyyyyyy')

    this.route.data.subscribe(data => {
      console.warn(data)
      this.movieDetails = data.movie;
    });
  }
}
