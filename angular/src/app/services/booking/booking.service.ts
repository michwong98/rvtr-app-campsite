import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Booking } from '../../data/booking.model';
import { Stay } from '../../data/stay.model';

/**
 * The booking service is the main form of communication from the angular app
 * to the BookingApi application.
 *
 * @export BookingService
 */
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly apiUrl$: Observable<string>;

  /**
   * Represents the _Booking Service_ `constructor` method
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => cfg.api.booking));
  }

  /**
   * Represents the _Booking Service_ `delete` method
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url, { params: { id } }))
    );
  }

  /**
   * Fetches the a list of `Booking` records from the `BookingApi` or a single
   * record if the `id` parameter is provided.
   * @param id string
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
   * Represents the _Booking Service_ `post` method
   * @param booking Booking
   */
  post(booking: Booking): Observable<boolean> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, booking)));
  }

  /**
   * Represents the _Booking Service_ `put` method
   * @param booking Booking
   */
  put(booking: Booking): Observable<Booking> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.put<Booking>(url, booking)));
  }
}
