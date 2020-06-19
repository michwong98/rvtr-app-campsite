import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

import { Booking } from '../../data/booking.model';
import { Stay } from '../../data/stay.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly apiUrl$: Observable<string[]>;

  /**
   * Represents the _Booking Service_ `constructor` method
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => [cfg.api.booking, cfg.api.stay]));
  }

  /**
   * Represents the _Booking Service_ `delete` method
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url[0], { params: { id } }))
    );
  }

  /**
   * Represents the _Booking Service_ `get` method
   * @param id string
   */
  get(id?: string): Observable<Booking[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Booking[]>(url[0], options)));
  }

  /**
   * Represents the _Booking Serve_ `get` method for Stays
   */
  getStays(checkIn: string, checkOut: string, lodgingId: string): Observable<Stay[]> {
    const params = new HttpParams()
      .set('lodgingId', lodgingId)
      .set('dates', `${checkIn} to ${checkOut}`);

    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Stay[]>(url[1], { params })));
  }

  /**
   * Represents the _Booking Service_ `post` method
   * @param booking Booking
   */
  post(booking: Booking): Observable<boolean> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<boolean>(url[0], booking)));
  }

  /**
   * Represents the _Booking Service_ `put` method
   * @param booking Booking
   */
  put(booking: Booking): Observable<Booking> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.put<Booking>(url[0], booking)));
  }
}
