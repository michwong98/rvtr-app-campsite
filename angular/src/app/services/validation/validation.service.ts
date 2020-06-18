import { AbstractControl, FormGroup } from '@angular/forms';
import { Rental } from 'src/app/data/rental.model';

export class ValidationService {
  /**
   * Returns the appropriate validation error message for the validator name.
   *
   * @returns Validation error message.
   */
  static config = {
    invalidRentals: 'One rental required.',
    invalidGuests: 'One adult required.',
    invalidOccupancy: 'Insufficient occupancy.',
    email: 'Invalid email format.',
    number: 'Invalid amount.',
    min: 'Invalid amount.',
    required: 'Required.'
  };

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    return this.config[validatorName];
  }

  /**
   * Validates that at least one rental was selected.
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
   * @returns Object with invalidGuests property.
   */
  static guestsValidator(control: AbstractControl): object {
    const adults = control.get('adults').value;
    return adults <= 0 ? { invalidGuests: true } : null;
  }

  static occupancyValidator(control: AbstractControl): object {
    const guests = control.get('guests') as FormGroup;
    const adults = guests.get('adults').value;
    const children = guests.get('children').value;
    const rentals = control.get('rentals').value;
    const occupancy = rentals.reduce((accumulator: number, rental: Rental) => {
      accumulator += rental.rentalUnit.occupancy;
    }, 0);

    return children + adults > occupancy ? { invalidOccupancy: true } : null;
  }
}
