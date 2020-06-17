import { AbstractControl } from '@angular/forms';

export class ValidationService {
  /**
   * Returns the appropriate validation error message for the validator name.
   *
   * @returns Validation error message.
   */
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    const config = {
      invalidRentals: 'One rental required.',
      invalidGuests: 'One guest required.',
      email: 'Invalid email format.',
      required: 'Required.'
    };
    return config[validatorName];
  }

  /**
   * Validates that at least one rental was selected.
   *
   * @returns Object with invalidRentals property.
   */
  static rentalsValidator(control: AbstractControl): object {
    if (control.value?.length >= 1) {
      return null;
    } else {
      return { invalidRentals: true };
    }
  }

  /**
   * Validates that at least one guest was selected.
   *
   * @returns Object with invalidGuests property.
   */
  static guestsValidator(control: AbstractControl) {
    if (control.value?.length >= 1) {
      return null;
    } else {
      return { invalidGuests: true };
    }
  }
}
