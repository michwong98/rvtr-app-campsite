import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uic-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {
  /**
   * Observable that retreives a list of bookings
   * from the `BookingService`
   */
  bookings$: Observable<Booking[]>;
  /**
   * Limits the amount of records to be returned
   */
  limit = 5;
  /**
   * The amount of records that should be skipped from the api server
   */
  offset = 5;

  constructor(private bookingsService: BookingService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  /**
   * Subscribes to the `BookingService.getPartial` observable,
   * fetching a list of `Booking`s from teh `BookingApi`.
   */
  getBookings(): void {
    this.bookings$ = this.bookingsService.getPartial(`${this.limit}`, `${this.offset}`);
  }

}
