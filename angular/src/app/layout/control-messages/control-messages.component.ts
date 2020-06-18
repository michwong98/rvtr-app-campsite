import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';

@Component({
  selector: 'uic-control-messages',
  template: `<span [style.visibility]="errorMessage ? 'visible' : 'hidden'" class="has-text-danger is-size-7">{{errorMessage ? errorMessage : 'Error message placeholder'}}</span>`
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control?.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
