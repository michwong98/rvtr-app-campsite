import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from 'src/app/data/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { concatMap } from 'rxjs/operators';

/**
 * Component that fetches a list of bookings from `BookingService` and
 * displays the results in the template
 */
@Component({
  selector: 'uic-bookings-list',
  templateUrl: './bookings-list.component.html'
})
export class BookingsListComponent implements OnInit {
  /** Observable that retreives a list of bookings from the `BookingService` */
  bookings$: Observable<Booking[]>;
  /** Limits the amount of records to be returned for a single page */
  @Input() pageLimit: number;
  /** The amount of records that should be skipped from the api server */
  total = 0;
  /** Number of pages for booking */
  pages = 0;
  /** The index of the current page of booking records fetched */
  currentPage = 1;

  constructor(private bookingsService: BookingService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  /**
   * Subscribes to the `BookingService.getPartial` observable,
   * fetching a list of `Booking`s from teh `BookingApi`.
   */
  getBookings(): void {
    this.bookings$ = this.bookingsService.get();
  }
}
