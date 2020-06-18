import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { getNewDateFromNowBy, formatDate } from '../utils/date-helpers';

import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';

import { Booking } from '../../../data/booking.model';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  lodgings$: Observable<Lodging[]> = this.lodgingService.get();
  bookings$: Observable<Booking[]>;

  @ViewChild(BookingModalComponent) bookingModal: BookingModalComponent;
  bookingForm: FormGroup;

  lodging: Lodging;
  booking: Booking;

  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private lodgingService: LodgingService,
  ) { }

  ngOnInit(): void {
    // Set fields for form group
    this.searchForm = this.formBuilder.group({
      location: [''],
      checkIn: [formatDate(getNewDateFromNowBy(1)), Validators.required],
      checkOut: [formatDate(getNewDateFromNowBy(2)), Validators.required],
      guests: [1, Validators.required],
    });
  }

  /**
   * Creates a 2-dimensional array of lodgings from the original 1D lodging array. Used to format lodging items to display in the template.
   * @param lodgings Lodging array to convert.
   * @param n Number of lodgings items to display per row.
   */
  public lodgingsRow(lodgings: Lodging[], n: number): Array<Lodging[]> {
    return lodgings.reduce((accumulator, currentLodge, index, array) => {
      if (index % n === 0) {
        const lodgingsSubarry = [];
        for (let i = index; i < index + n; i++) lodgingsSubarry.push(array[i]);
        accumulator.push(lodgingsSubarry);
      }
      return accumulator;
    }, []);
  }
}
