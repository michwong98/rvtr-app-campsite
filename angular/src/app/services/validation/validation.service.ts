import { AbstractControl } from '@angular/forms';

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    const config = {
      invalidRentals: 'One rental required.',
      invalidGuests: 'One guest required.',
      email: 'Invalid email format.',
      required: 'Required.'
    };
    return config[validatorName];
  }

  static rentalsValidator(control: AbstractControl) {
    if (control.value?.length >= 1) {
      return null;
    } else {
      return { invalidRentals: true };
    }
  }

  static guestsValidator(control: AbstractControl) {
    if (control.value?.length >= 1) {
      return null;
    } else {
      return { invalidGuests: true };
    }
  }
}
