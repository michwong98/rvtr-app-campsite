import { Booking } from 'src/app/data/booking.model';

/**
 * The expected response from the `BookingApi`
 *
 * This implementation is a generic.  Currently only
 * there's only two types of models to be expected to return
 * from the api:
 *
 * - Booking
 * - Stay
 *
 * @export
 * @template T The type of model returned from the BookingApi
 */
export interface BookingApiFetchedRecords<T> {
  /**
   * A list of records returned from the `BookingApi`
   */
  records: T[];
  /**
   * The total number of entities currently store
   * within the database.
   */
  total: number;
}
