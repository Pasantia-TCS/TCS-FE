import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: ['']
})
export class ButtonComponent {

  @Input() type: string = 'button';
  @Input() buttonIcon: boolean = false;
  @Input() buttonName: string = '';
  @Input() iconName: string = '';
  @Input() isDisabled: boolean = false;
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }

}
