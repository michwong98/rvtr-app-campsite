import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Booking } from '../../data/booking.model';

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
  private readonly apiUrl$: Observable<string>;

  /**
   * Service used for making HTTP requests to the `BookingApi` server
   * @param config Configuration service used to determine the api endpoints
   * @param http Utility used to make AJAX requests
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => cfg.api.booking));
  }

  /**
   * Deletes a `Booking` record
   * @param id The booking's unique id
   */
  delete(id: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url, { params: { id } }))
    );
  }

  /**
   * Fetches the a list of `Booking` records from the `BookingApi` or a single
   * record if the `id` parameter is provided.
   * @param id Optional - id of the specified `Booking` record
   */
  get(id?: string): Observable<Booking[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Booking[]>(url, options)));
  }

  /**
   * Returns a list of Booking records from the api server based on a
   * provided offset and limit
   * @param limit The amount of records to retreive from the request
   * @param offset The amount of booking records to skip
   */
  getPage(limit: string = '5', offset: string = '5'): Observable<Booking[]> {
    const options = { params: new HttpParams().append('limit', limit).append('offset', offset) };
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Booking[]>(url, options)));
  }

  /**
   * Requests the creation of a new `Booking` record to the server using data
   * sent in JSON format
   * @param booking A JSON object with `Booking` relevant data
   */
  post(booking: Booking): Observable<boolean> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, booking)));
  }

  /**
   * Requests a `Booking` record to be update to the server
   * @param booking The modified `Booking` record
   */
  put(booking: Booking): Observable<Booking> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.put<Booking>(url, booking)));
  }
}
