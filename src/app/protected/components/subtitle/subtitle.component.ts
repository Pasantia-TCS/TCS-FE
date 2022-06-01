import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  templateUrl: './subtitle.component.html',
  styles: [
  ]
})
export class SubtitleComponent {

  @Input() filterStyle = { color: 'var(--tcs-red)' }
  @Input() title: string = "";

}
