import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from 'src/app/data/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { concatMap } from 'rxjs/operators';
import { BookingApiFetchedRecords } from '../@types/BookingApiFetchedRecords';

/**
 * Component that fetches a list of bookings from `BookingService` and
 * displays the results in the template
 */
@Component({
  selector: 'uic-bookings-list',
  templateUrl: './bookings-list.component.html'
})
export class BookingsListComponent implements OnInit {
  /**
   * Observable that retreives a list of bookings
   * from the `BookingService`
   */
  bookings$: Observable<BookingApiFetchedRecords<Booking>>;
  /**
   * Limits the amount of records to be returned for a single page
   */
  @Input() pageLimit: number;
  /**
   * The amount of records that should be skipped from the api server
   */
  total = 0;
  /**
   * Number of pages for booking
   */
  pages = 0;
  /**
   * The index of the current page of booking records fetched
   */
  currentPage = 1;

  constructor(private bookingsService: BookingService) {}

  ngOnInit(): void {
    this.getBookings(this.pageLimit, 0);
  }

  /**
   * Convencience getter for using Array object
   */
  get numPages(): any[] {
    return new Array(this.pages);
  }

  /**
   * Fires a call to the `BookingApi` to fetch
   * @param page The page number relative to the limit of records being fetched
   */
  getPage(page: number): void {
    // page is 0 indexed, so add one
    this.currentPage = page + 1;
    this.getBookings(this.pageLimit, page * this.pageLimit);
  }

  /**
   * Subscribes to the `BookingService.getPartial` observable,
   * fetching a list of `Booking`s from teh `BookingApi`.
   */
  getBookings(limit: number, offset: number): void {
    this.bookings$ = this.bookingsService.getPage(`${limit}`, `${offset}`);

    this.bookings$.subscribe((bookingResp) => {
      // Get total number of pages and account for additional page
      // by using the remainder
      this.total = bookingResp.total;
      const numCompletePages = Math.floor(this.total / this.pageLimit);
      this.pages = numCompletePages === 0 ? numCompletePages : numCompletePages + 1;
    });
  }
}
