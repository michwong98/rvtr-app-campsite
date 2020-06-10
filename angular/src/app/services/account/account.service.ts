import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Account } from '../../data/account.model';
import { Review } from '../../data/review.model';
import { Booking } from '../../data/booking.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiUrl$: Observable<string>;

  /**
   * Represents the _Account Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => cfg.api.account));
  }

  dummyGetBookings(id: string): Observable<Booking[]>{
    let books: Booking[] = [];
    let bookOne: Booking = {
      id: "1",
      accountId: "1",
      lodgingId: "1",
      guests: null,
      rentals: null,
      stay: {
        id: "1",
        checkIn: new Date("1/10/2020"),
        checkOut: new Date("1/15/2020"),
        dateCreated: null,
        dateModified: null
      },
      status: null
    }
    let bookTwo: Booking = {
      id: "2",
      accountId: "1",
      lodgingId: "2",
      guests: null,
      rentals: null,
      stay: {
        id: "2",
        checkIn: new Date("1/10/2020"),
        checkOut: new Date("1/15/2020"),
        dateCreated: null,
        dateModified: null
      },
      status: null
    }
    books.push(bookOne);
    books.push(bookTwo);
    return of(books);
  }

  dummyGetReveiws(id: string): Observable<Review[]> {
    let revs: Review[] = [];
    let rOne: Review = {
      id: "1",
      accountId: "1",
      hotelId: "1",
      comment: "good stuff man",
      dateCreated: new Date("6/10/2020"),
      rating: 4
    }
    revs.push(rOne);
    let rTwo: Review = {
      id: "2",
      accountId: "1",
      hotelId: "2",
      comment: "super bad",
      dateCreated: new Date("6/10/2020"),
      rating: 1
    }
    revs.push(rTwo);
    return of(revs);

  }

  get(id?: string): Observable<Account> {
    let acc: Account = {
        id:'1',
        address: {
            id:'1',
            city:'Dallas',
            country:'US',
            postalCode:'12345',
            stateProvince:'Texas',
            street:'1234 testing st.'
        }
        ,
        name: 'John Doe',
        payments:[{
            id:'1',
            cardExpirationDate: new Date("7/9/21"),
            cardName: 'Visa',
            cardNumber: '123456789123456'
        },
        {
            id:'2',
            cardExpirationDate: new Date("1/22/21"),
            cardName: 'Master',
            cardNumber: '987654321987654'
        },
    ],
        profiles:[{
            id: '1',
            email:'JohnDoe@gmail.com',
            name: {
                id:'1',
                family:'Doe',
                given:'John'
            },
            phone:'1234567891'
        },
        {
            id: '2',
            email:'JaneDoe@gmail.com',
            name: {
                id:'2',
                family:'Doe',
                given:'Jane'
            },
            phone:'9876543219'
        }]}
        let obvAcc = of(acc);
        return obvAcc;
  }

  /**
   * Represents the _Account Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url, { params: { id } }))
    );
  }

  /**
   * Represents the _Account Service_ `get` method
   *
   * @param id string
   */
  /**get(id?: string): Observable<Account[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.apiUrl$.pipe(concatMap((url) => this.http.get<Account[]>(url, options)));
  }*/

  /**
   * Represents the _Account Service_ `post` method
   *
   * @param account Account
   */
  post(account: Account): Observable<boolean> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, account)));
  }

  /**
   * Represents the _Account Service_ `put` method
   *
   * @param account Account
   */
  put(account: Account): Observable<Account> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.put<Account>(url, account)));
  }
}
