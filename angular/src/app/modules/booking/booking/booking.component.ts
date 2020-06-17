import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';

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

  @ViewChild(BookingModalComponent) bookingModal: BookingModalComponent;
  bookingForm: FormGroup;

  lodgings: Lodging[];
  lodging: Lodging;
  booking: Booking;

  searchForm: FormGroup;

  /**
   * Getter for the search form's controls.
   *
   * @readonly
   * @memberof BookingComponent
   */
  get f() {
    return this.searchForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private lodgingService: LodgingService,
  ) {}

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
   * Filters lodgings by search form's location value.
   *
   * @returns {void}
   * @memberof BookingComponent
   */
  onSubmit(): void {
    if (this.searchForm.invalid) return;

    this.retreiveLodgingsByPhrase(this.f.location.value);

    // TODO: submit form data to http request
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
