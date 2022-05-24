import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styles: []
})
export class StarRatingComponent implements OnInit {

  @Input('rating') rating: number = 1;
  @Input('starCount') starCount: number = 10;
  @Input('color') color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter();

  ratingArr: number[] = [];

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    return (this.rating >= index + 1) ? 'star' : 'star_border';
  }

}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
