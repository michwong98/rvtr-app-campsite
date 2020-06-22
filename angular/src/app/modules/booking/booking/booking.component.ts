import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { getNewDateFromNowBy, formatDate } from './../utils/date-helpers';

import { LodgingService } from './../../../services/lodging/lodging.service';
import { Lodging } from './../../../data/lodging.model';

import { Booking } from './../../../data/booking.model';
import { BookingModalComponent } from './../booking-modal/booking-modal.component';

/**
 * The Base component for the booking portion of this appilcation.
 * Responsible for Displaying lodgings that a user can filter through a
 * search form and posting new bookings through the booking modal.
 */
@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  /**
   * Observable that subscribes the `Lodgings` service.  Once it
   * fetches a result, it will populate the template with a list
   * of lodgings and their details.
   */
  lodgings$: Observable<Lodging[]>;
  bookings$: Observable<Booking[]>;

  /**
   * The modal component that will popup once a user clicks a `Lodging` item
   * from the list.
   */
  @ViewChild(BookingModalComponent) bookingModal: BookingModalComponent;
  bookingForm: FormGroup;


  lodging: Lodging;
  booking: Booking;

  /**
   * Takes in User input to determine the list of lodgings to display to the
   * and the data to fill into the booking modal once the User clicks on a
   * `Lodging` item.
   */
  searchForm: FormGroup;

  constructor(private readonly lodgingService: LodgingService) { }

  ngOnInit(): void {
    this.lodgings$ = this.lodgingService.get(null, new HttpParams().set('IncludeImages', true.toString()));

    // Creates search form.
    this.searchForm = new FormGroup({
      location: new FormControl(''),
      checkIn: new FormControl(formatDate(getNewDateFromNowBy(1)), Validators.required),
      checkOut: new FormControl(formatDate(getNewDateFromNowBy(2)), Validators.required),
      guests: new FormControl(1, Validators.required)
    });
  }
}
