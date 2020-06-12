export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    let config = {
      invalidRentals: 'Invalid rentals. Must select at least one rental.',
      invalidGuests: 'Invalid guests. Must have at least one guest.'
    };
    return config[validatorName];
  }

  static rentalsValidator(control) {
    if (control.value?.length < 1) {
      return { invalidRentals: true };
    } else {
      return null;
    }
  }

  static guestsValidator(control) {
    if (control.value?.length < 1) {
      return { invalidGuests: true };
    } else {
      return null;
    }
  }
}
