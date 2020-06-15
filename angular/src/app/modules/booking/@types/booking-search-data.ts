import { AbstractControl } from '@angular/forms';

/**
 * Data yielded from the booking search form
 */
export interface BookingSearchData {
  /**
   * Number of guests booking
   */
  guests: AbstractControl;
  /**
   * Date the guest(s) will check-in
   */
  checkIn: AbstractControl;
  /**
   * Date the guest(s) will check-out
   */
  checkOut: AbstractControl;
  /**
   * Location to search for
   */
  location?: AbstractControl;
}
