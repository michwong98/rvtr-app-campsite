import { Booking } from './booking.model';

/**
 * Represents the _Stay_ model
 *
 * ```yaml
 * id: string
 * checkIn: Date
 * checkout: Date
 * dateCreated: Date
 * dateModified: Date
 * ```
 */
export interface Stay {
  id: string;
  checkIn: Date;
  checkOut: Date;
  dateCreated: Date;
  dateModified: Date;
  booking?: Booking;
}
