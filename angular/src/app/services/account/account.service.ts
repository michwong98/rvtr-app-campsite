import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Account } from '../../data/account.model';
import { Review } from '../../data/review.model';
import { Booking } from '../../data/booking.model';

import * as _ from 'lodash';
import { Payment } from 'src/app/data/payment.model';
import { Profile } from 'src/app/data/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly accountUrl$: Observable<string>;
  private readonly paymentUrl$: Observable<string>;
  private readonly profileUrl$: Observable<string>;

  /**
   * Represents the _Account Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.accountUrl$ = config.get().pipe(map((cfg) => cfg.api.account.base + cfg.api.account.uri.account));
    this.paymentUrl$ = config.get().pipe(map((cfg) => cfg.api.account.base + cfg.api.account.uri.payment));
    this.profileUrl$ = config.get().pipe(map((cfg) => cfg.api.account.base + cfg.api.account.uri.profile));
  }


  /**
   * Represents the _Account Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.accountUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url + '/' + id))
    );
  }

  deletePayment(id: number): Observable<boolean> {
    return this.paymentUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url + '/' + id))
    );
  }

  deleteProfile(id: number): Observable<boolean> {
    return this.profileUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url + '/' + id))
    );
  }


  /**
   * Represents the _Account Service_ `get` method
   *
   * @param id string
   */

  getUserId() {
    return '1';
  }

  get(id?: string): Observable<Account[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.accountUrl$.pipe(concatMap((url) => this.http.get<Account[]>(url, options)));
  }

  getPayment(id?: string): Observable<Payment[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.paymentUrl$.pipe(concatMap((url) => this.http.get<Payment[]>(url, options)));
  }

  getProfile(id?: string): Observable<Profile[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.profileUrl$.pipe(concatMap((url) => this.http.get<Profile[]>(url, options)));
  }

  /**
   * Represents the _Account Service_ `post` method
   *
   * @param account Account
   */
  post(account: Account): Observable<boolean> {
    return this.accountUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, account)));
  }

  postPayment(payment: Payment): Observable<boolean> {
    return this.paymentUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, payment)));
  }

  postProfile(profile: Profile): Observable<boolean> {
    return this.profileUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, profile)));
  }

  /**
   * Represents the _Account Service_ `put` method
   *
   * @param account Account
   */
  put(account: Account): Observable<Account> {
    return this.accountUrl$.pipe(concatMap((url) => this.http.put<Account>(url, account)));
  }
  /* istanbul ignore next */
  getBookings(accountIds?: string, limit?: number): Observable<Booking[]> {
    let books: Booking[] = [];
    const bookOne: Booking = {
      id: '1',
      accountId: '1',
      lodgingId: '1',
      guests: null,
      bookingRentals: [],
      stay: {
        id: '1',
        checkIn: new Date('1/10/2020'),
        checkOut: new Date('1/15/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    };
    const bookTwo: Booking = {
      id: '2',
      accountId: '1',
      lodgingId: '2',
      guests: null,
      bookingRentals: [],
      stay: {
        id: '2',
        checkIn: new Date('1/10/2020'),
        checkOut: new Date('1/15/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    };
    const bookThree: Booking = {
      id: '3',
      accountId: '2',
      lodgingId: '3',
      guests: null,
      bookingRentals: [],
      stay: {
        id: '3',
        checkIn: new Date('2/20/2020'),
        checkOut: new Date('2/25/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    };
    const bookFour: Booking = {
      id: '4',
      accountId: '1',
      lodgingId: '4',
      guests: null,
      bookingRentals: [],
      stay: {
        id: '4',
        checkIn: new Date('6/12/2020'),
        checkOut: new Date('6/17/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    };
    books.push(bookOne);
    books.push(bookTwo);
    books.push(bookThree);
    books.push(bookFour);

    // Represents server side sorting, filtering
    books = books.filter(booking => booking.accountId === accountIds).sort((a, b) => Number(b.id) - Number(a.id));
    // const options = id ? { params: new HttpParams().set('id', id) } : {};
    // options.params.set('limit', limit.toString());
    // options.params.set('accountId', accountId)
    // this.apiUrl$.pipe(concatMap((url) => this.http.get<Account[]>(url, options)));
    return of(books);
  }
  /* istanbul ignore next */
  getReviews(id: string): Observable<Review[]> {
    const revs: Review[] = [];
    const rOne: Review = {
      id: '1',
      accountId: '1',
      lodgingId: '1',
      comment: 'good stuff man',
      dateCreated: new Date('6/10/2020'),
      rating: 4
    };
    revs.push(rOne);
    const rTwo: Review = {
      id: '2',
      accountId: '1',
      lodgingId: '2',
      comment: 'super bad',
      dateCreated: new Date('6/10/2020'),
      rating: 1
    };
    revs.push(rTwo);
    return of(revs);
  }

  // Accepts a file and attempts to resolve it to an image and convert it to a Base64 string.
  validateImage(fileInput: any): any {
    // If the input contains files..
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const maxSize = 20971520;
      const allowedTypes = ['image/png', 'image/jpeg'];
      const maxHeight = 15200;
      const maxWidth = 25600;
      let imageError = null;

      // If the input file is greater than the maximum size, return an error message
      if (fileInput.target.files[0].size > maxSize) {
        imageError = `Maximum size allowed is ${maxSize / 1000} + Mb`;
        return { valid: false, message: imageError };
      }

      // If the input file is not one of the allowed file formats, return an error message
      if (!_.includes(allowedTypes, fileInput.target.files[0].type)) {
        imageError = 'Only Images are allowed ( JPG | PNG )';
        return { valid: false, message: imageError };
      }

      // FileReader onload occurs asynchronously, so we resolve the following results as promises
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const height = 'height';
            const width = 'width';
            const imgHeight = rs.currentTarget[height];
            const imgWidth = rs.currentTarget[width];

            // If the input file dimesions are too large, return an error message
            if (imgHeight > maxHeight && imgWidth > maxWidth) {
              imageError = `Maximum dimensions allowed: ${maxHeight} * ${maxWidth}px`;
              return { valid: false, message: imageError };
            }
            // Otherwise, the file is a valid image, and the Base64 string is returned
            else {
              const imgBase64Path = e.target.result;
              resolve({ valid: true, message: imgBase64Path });
            }
          };
        };
        reader.onerror = (e: any) => {
          reject(e);
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      });
    }
  }

  // Credit card validation function, checks credits card string length and against Luhn's algorithm
  isValidCreditCard(cardString: string) {
    if (cardString.toString().length < 13 || cardString.toString().length > 16) {
      return false;
    } else {
      let sum = 0;
      for (let i = 0; i < cardString.length; i++) {
        let cardDigit = Number(cardString[i]);
        if ((cardString.length - i) % 2 === 0) {
          cardDigit = cardDigit * 2;
          if (cardDigit > 9) {
            cardDigit = cardDigit - 9;
          }
        }
        sum += cardDigit;
      }
      console.log(sum % 10);
      return sum % 10 === 0;
    }
  }
}
