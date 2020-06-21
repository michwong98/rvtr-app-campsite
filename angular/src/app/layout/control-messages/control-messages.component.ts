import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';

@Component({
  selector: 'uic-control-messages',
  templateUrl: './control-messages.component.html'
})

export class ControlMessagesComponent implements OnInit{
  @Input() control: FormControl;
  constructor() { }

  ngOnInit(): void {}

  get errorMessage() {
    for (const propertyName in this.control?.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
