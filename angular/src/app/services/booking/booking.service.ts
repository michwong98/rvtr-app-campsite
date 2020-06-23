import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from './../config/config.service';
import { Booking } from './../../data/booking.model';
import { Stay } from './../../data/stay.model';

/**
 * The booking service is the main form of communication from the angular app
 * to the BookingApi application.
 *
 * @export BookingService
 */
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly apiUrl$: Observable<string[]>;

  /**
   * Service used for making HTTP requests to the `BookingApi` server
   * @param config Configuration service used to determine the api endpoints
   * @param http Utility used to make AJAX requests
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => [cfg.api.booking.booking, cfg.api.booking.stay]));
  }

  /**
   * Deletes a `Booking` record
   * @param id The booking's unique id
   */
  delete(id: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(`${url[0]}/${id}`))
    );
  }

  /**
   * Fetches the a list of `Booking` records from the `BookingApi` or a single
   * record if the `id` parameter is provided.
   * @param id Optional - id of the specified `Booking` record
   */
  get(id?: string, params?: HttpParams): Observable<Booking[]> {
    const parameters = params ? params : new HttpParams();
    const options = { params: parameters };
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Booking[]>(`${url[0]}/${id ? id : ''}`, options)));
  }

  /**
   * Fetches a list of `Stay`s for a specified `Lodging` record
   * @param checkIn The checkin constraint that finds all `Stay`s after this date
   * @param checkOut Date constraint that finds all `Stay`s before this date
   * @param lodgingId Unique id of the `Lodging` to search for `Stay`s
   */
  getStays(checkIn: string, checkOut: string, lodgingId: string): Observable<Stay[]> {
    const params = new HttpParams()
      .set('filter', 'booking.status=="Valid"')
      .set('lodgingId', lodgingId)
      .set('dates', `${checkIn} to ${checkOut}`);

    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Stay[]>(url[1], { params })));
  }

  /**
   * Requests the creation of a new `Booking` record to the server using data
   * sent in JSON format
   * @param booking A JSON object with `Booking` relevant data
   */
  post(booking: Booking): Observable<boolean> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<boolean>(url[0], booking)));
  }

  /**
   * Requests a `Booking` record to be update to the server
   * @param booking The modified `Booking` record
   */
  put(booking: Booking): Observable<Booking> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.put<Booking>(url[0], booking)));
  }
}
