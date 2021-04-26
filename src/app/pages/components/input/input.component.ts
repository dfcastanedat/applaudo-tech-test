import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { DETAIL_ROUTE } from '@utils/constants';
import { IPreviewResult } from '@utils/interfaces';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() previewResults: IPreviewResult[];

  @Input() placeHolder: string;

  @Input() label: string;

  @Input()
  labelStyle: { [key: string]: string } = {};

  @Input()
  readonly = false;

  @Output()
  itemSelected = new EventEmitter();

  @Output()
  touched = new EventEmitter();

  fControl: FormControl = new FormControl();

  @Input('fControl')
  set onFormControlChange(fControl: AbstractControl) {
    if (fControl) {
      this.fControl = fControl as FormControl;
    }
  }

  get controlHasError(): boolean {
    return this.fControl?.errors ? true : false;
  }

  get controlErrorMessage(): string | null {
    const control = this.fControl;
    const errors = control?.errors;
    if (errors?.required && control?.touched) {
      return 'This field is necesary';
    }
    return null;
  }

  getItemLink(index: number): string {
    return `${DETAIL_ROUTE}/${this.previewResults[index].type}/${this.previewResults[index].itemId}`;
  }

  selectedItem(i: number): void {
    this.itemSelected.emit(this.previewResults[i]);
  }

  touchedInput(): void {
    this.touched.emit(true);
  }
}
