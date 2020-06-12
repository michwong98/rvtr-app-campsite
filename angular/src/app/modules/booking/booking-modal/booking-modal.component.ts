import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { getNewDateFromNowBy, formatDate } from '../utils/date-helpers';
import { ValidationService } from '../../../services/validation/validation.service';

import { Profile } from 'src/app/data/profile.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/data/booking.model';
import { Lodging } from 'src/app/data/lodging.model';

@Component({
  selector: 'uic-booking-modal',
  templateUrl: './booking-modal.component.html',
})
export class BookingModalComponent implements OnInit {
  @ViewChild('bookingModal') bookingModal: ElementRef;
  bookingForm: FormGroup;
  @Input() booking: Booking;
  @Input() lodging: Lodging;
  @Input() searchData: BookingSearchData;

  constructor(
    private formBuilder: FormBuilder,
    private lodgingService: LodgingService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.newBookingForm();
  }

  get f() {
    return this.bookingForm.controls;
  }

  get Math() {
    return Math;
  }

  /**
   * Creates a new booking form
   * Clears existing booking properties
   */
  private newBookingForm(): void {
    // Sets up booking properties.
    this.booking = {
      lodgingId: this.lodging?.id,
      stay: {},
      guests: [],
      rentals: []
    } as Booking;

    // Creates new booking form.
    const guests = this.searchData?.guests?.value ? this.searchData.guests.value : 0;
    this.bookingForm = this.formBuilder.group({
      checkIn: [this.searchData.checkIn.value ? this.searchData.checkIn.value : formatDate(getNewDateFromNowBy(1)), Validators.required],
      checkOut: [this.searchData.checkOut.value ? this.searchData.checkOut.value : formatDate(getNewDateFromNowBy(1)), Validators.required],
      guests: this.formBuilder.array(this.createGuestItem(guests) as FormGroup[], [Validators.required, ValidationService.guestsValidator]),
      rentals: new FormControl(null, [Validators.required, ValidationService.rentalsValidator])
    });
  }

  /**
   * Binds booking form data to booking object
   * Sends post request to booking api
   */
  onBookingFormSubmit(): void {
    // TODO: set booking submitted state
    if (this.bookingForm.invalid) {
      // TODO: display invalidation message to user
      console.error('Invalid booking form');
      return;
    }

    // Sets the stay property for booking.
    this.booking.stay.checkIn = this.searchData.checkIn.value;
    this.booking.stay.checkOut = this.searchData.checkOut.value;

    // Sets the guests property for booking.
    (this.f.guests.value as []).forEach((data: any) => {
      const guest = {
        name: {
          given: data.given,
          family: data.family,
        },
        email: data.email,
        phone: data.phone,
      } as Profile;
      this.booking.guests.push(guest);
    });

    // Sets the rentals property for booking.
    this.booking.rentals = this.f.rentals.value;

    // TODO: send data as request
    console.log(this.booking);
  }

  createGuestItem(n?: number): FormGroup | FormGroup[] {
    if (n == null) {
      return this.formBuilder.group({
        given: [null, Validators.required],
        family: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        phone: [null],
      });
    } else {
      let guests = [];
      for (let i = 0; i < n; i++) {
        guests.push(this.formBuilder.group({
          given: [null, Validators.required],
          family: [null, Validators.required],
          email: [null, [Validators.required, Validators.email]],
          phone: [null],
        }));
      }
      return guests;
    }
  }

  addNextGuestItem(): void {
    // tslint:disable-next-line: no-string-literal
    (this.bookingForm.controls['guests'] as FormArray).push(this.createGuestItem() as FormGroup);
  }

  removeGuestItem(ind: number): void {
    // tslint:disable-next-line: no-string-literal
    const bookingFormArr: FormArray = this.bookingForm.controls['guests'] as FormArray;

    bookingFormArr.removeAt(ind);
  }

  public openModal(event: MouseEvent, lodging: Lodging): void {
    event?.stopPropagation();

    // Disable body scrolling.
    document.querySelector('html').classList.add('is-clipped');

    // Opens modal.
    this.bookingModal.nativeElement.classList.add('is-active');

    this.newBookingForm();

    // Sets lodging property.
    this.lodging = lodging;
  }

  public closeModal(event: MouseEvent): void {
    event?.stopPropagation();

    // Enable body scrolling.
    document.querySelector('html').classList.remove('is-clipped');

    this.bookingModal.nativeElement.classList.remove('is-active');
  }
}

/**
 * Data yielded from the booking search form
 */
interface BookingSearchData {
  /**
   * Number of guests booking
   */
  guests: AbstractControl;
  /**
   * Date the guest(s) will check-in
   */
  checkIn: AbstractControl;
  /**
   * Date the guest(s) will check-out
   */
  checkOut: AbstractControl;
  /**
   * Location to search for
   */
  location?: AbstractControl;
}
