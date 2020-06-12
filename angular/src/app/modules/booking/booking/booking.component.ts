import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';

import { BookingService } from '../../../services/booking/booking.service';
import { Booking } from '../../../data/booking.model';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { getNewDateFromNowBy, formatDate } from '../utils/date-helpers';

@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  lodgings$: Observable<Lodging[]>;
  bookings$: Observable<Booking[]>;

  // @ViewChild('bookingModal') bookingModal: ElementRef;
  @ViewChild(BookingModalComponent) bookingModal: BookingModalComponent;
  bookingForm: FormGroup;

  lodgings: Lodging[];
  lodging: Lodging;
  booking: Booking;

  /**
   * State used to determine if form was submitted
   */
  submitted: boolean;
  /**
   * State used to determine if awaiting for data from AJAX request
   */
  laoding: boolean;
  searchForm: FormGroup;

  /**
   * convencience getter for easy access to form fields
   */
  get f() {
    return this.searchForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private lodgingService: LodgingService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    // Set fields for form group
    this.searchForm = this.formBuilder.group({
      location: [''],
      checkIn: [formatDate(getNewDateFromNowBy(1)), Validators.required],
      checkOut: [formatDate(getNewDateFromNowBy(2)), Validators.required],
      guests: [1, Validators.required],
    });

    this.lodgings$ = this.lodgingService.get();
  }

  /**
   * Filter's results recieved from test observable using a given phrase
   * @param phrase String used to filter results
   */
  retreiveLodgingsByPhrase(phrase: string): void {
    // Return all results if string is empty
    if (!phrase.length) {
      this.lodgings$ = this.lodgingService.get();
      return;
    }

    this.lodgings$ = this.lodgingService.get().pipe(
      // return the list of lodgings filtered by the phrase
      map((lodgings) =>
        lodgings.filter((l) =>
          `${l.location.address.street}, ${l.location.address.city}, ${l.location.address.stateProvince}`.includes(
            phrase
          )
        )
      )
    );
  }

  /**
   * Submits seach data to httpRequest
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.searchForm.invalid)
      return;

    this.retreiveLodgingsByPhrase(this.f.location.value);

    // TODO: submit form data to http request
  }

  // For later.
  public lodgingsRow(lodgings: Lodging[], n: number): Array<Lodging[]> {
    return lodgings.reduce((accumulator, currentLodge, index, array) => {
      if (index % n === 0) {
        const lodgingsSubarry = [];
        for (let i = index; i < index + n; i++)
          lodgingsSubarry.push(array[i]);
        accumulator.push(lodgingsSubarry);
      }
      return accumulator;
    }, []);
  }
}
