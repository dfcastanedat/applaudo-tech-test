import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string;

  @Input() primary: boolean;

  @Input() type = 'button';

  @Input() disabled = false;
}
