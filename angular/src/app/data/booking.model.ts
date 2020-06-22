import { Profile } from './profile.model';
import { Rental } from './rental.model';
import { Stay } from './stay.model';

/**
 * Represents the _Booking_ model
 *
 * ```yaml
 * id: string;
 * accountId: string;
 * lodgingId: string;
 * guests: Profile[];
 * rentals: Rental[];
 * stay: Stay;
 * status: string;
 * ```
 */
export interface Booking {
  id: string;
  accountId: string;
  lodgingId: string;
  guests: Profile[];
  rentals: Rental[];
  bookingRentals?: BookingRental[];
  stay: Stay;
  status: 'Valid' | 'Invalid' | 'Cancelled';
}

export interface BookingRental {
  bookingId: string;
  rentalId: string;
}
