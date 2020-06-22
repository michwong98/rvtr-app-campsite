import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from './../../../data/booking.model';
import { BookingService } from './../../../services/booking/booking.service';

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
  @Input() bookings$: Observable<Booking[]>;

  @Output() bookingClickHandler = new EventEmitter<Booking>();

  constructor(private readonly bookingsService: BookingService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  /**
   * Subscribes to the `BookingService.getPartial` observable,
   * fetching a list of `Booking`s from teh `BookingApi`.
   */
  public getBookings(): void {
    this.bookings$ = this.bookingsService.get();
  }

  public deleteBooking(booking: Booking): void {
    this.bookingsService.delete(booking.id).subscribe(
      () => this.getBookings()
    )
  }

  public editBooking(booking: Booking): void {
    this.bookingClickHandler.emit(booking);
  }
}
