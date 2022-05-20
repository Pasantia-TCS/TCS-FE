import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarRatingColor } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  multipleAnswers = false;
  requiredQuestion = false;
  textArea = false;

  // Star rating
  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toForms() {
    this.router.navigateByUrl('/pages/dashboard/forms');
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
  }

}
