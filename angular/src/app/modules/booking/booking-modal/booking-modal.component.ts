import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { getNewDateFromNowBy, formatDate } from '../utils/date-helpers';
import { ValidationService } from '../../../services/validation/validation.service';

import { Profile } from 'src/app/data/profile.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/data/booking.model';
import { Lodging } from 'src/app/data/lodging.model';
import { BookingSearchData } from '../@types/booking-search-data';

@Component({
  selector: 'uic-booking-modal',
  templateUrl: './booking-modal.component.html',
})
export class BookingModalComponent implements OnInit {
  // Element reference for the booking modal html element.
  @ViewChild('bookingModal') bookingModal: ElementRef;

  // Form group for the booking form.
  bookingForm: FormGroup;

  // Booking object containing information on the current booking.
  @Input() booking: Booking;

  // Lodging object containing information on the current lodging.
  @Input() lodging: Lodging;

  // Search data information.
  @Input() searchData: BookingSearchData;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.newBookingForm();
  }

  /**
   * Getter for booking form's controls.
   *
   * @readonly
   * @memberof BookingModalComponent
   */
  get f() {
    return this.bookingForm.controls;
  }

  /**
   * Used in template to access Math functions.
   *
   * @readonly
   * @memberof BookingModalComponent
   */
  get Math() {
    return Math;
  }

  /**
   * Creates a new booking form. Clears existing booking form information.
   *
   * @private
   * @memberof BookingModalComponent
   */
  private newBookingForm(): void {
    // Sets up booking properties.
    this.booking = {
      stay: {},
      guests: [],
      rentals: [],
    } as Booking;

    const guests = this.searchData.guests.value ? this.searchData.guests.value : 0;

    // Creates a new booking form.
    this.bookingForm = this.formBuilder.group({
      // Check in.
      checkIn: [
        this.searchData.checkIn.value
          ? this.searchData.checkIn.value
          : formatDate(getNewDateFromNowBy(1)),
        Validators.required,
      ],

      // Check out.
      checkOut: [
        this.searchData.checkOut.value
          ? this.searchData.checkOut.value
          : formatDate(getNewDateFromNowBy(1)),
        Validators.required,
      ],

      // Form fields for guest information.
      guests: this.formBuilder.array(this.createGuestItem(guests) as FormGroup[], [
        ValidationService.guestsValidator,
        Validators.required,
      ]),

      // Rentals.
      rentals: new FormControl(null, [ValidationService.rentalsValidator, Validators.required]),
    });

    // Display error messages for guests and rentals.
    this.bookingForm.controls['guests'].markAsTouched();
    this.bookingForm.controls['rentals'].markAsTouched();
  }

  /**
   * Binding booking form data to booking object.
   * Sends an HTTP Post request to the API with the booking object.
   *
   * @returns {void}
   * @memberof BookingModalComponent
   */
  onBookingFormSubmit(): void {
    if (this.bookingForm.invalid) {
      return;
    }

    this.booking.lodgingId = this.lodging.id;
    this.booking.accountId = 'PLACEHOLDERID';

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
    this.closeModal();
    this.bookingService.post(this.booking).subscribe(
      (res) => console.log(this.booking),
      (err) => console.log(this.booking),
      () => console.log('HTTP request completed.')
    );
  }

  /**
   * Creates one or more guest form groups
   * @param n Optional parameter of number of form groups to create
   */
  createGuestItem(n?: number): FormGroup | FormGroup[] {
    if (n == null) {
      return this.formBuilder.group({
        given: [null, Validators.required],
        family: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        phone: [null],
      });
    } else {
      const guests = [];
      for (let i = 0; i < n; i++) {
        guests.push(
          this.formBuilder.group({
            given: [null, Validators.required],
            family: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            phone: [null],
          })
        );
      }
      return guests;
    }
  }

  /**
   * Create a guest information form group.
   *
   * @memberof BookingModalComponent
   */
  addNextGuestItem(): void {
    // tslint:disable-next-line: no-string-literal
    (this.bookingForm.controls['guests'] as FormArray).push(this.createGuestItem() as FormGroup);
  }

  /**
   * Remove guest information form group.
   *
   * @param {number} ind Index of the form group to remove.
   * @memberof BookingModalComponent
   */
  removeGuestItem(ind: number): void {
    // tslint:disable-next-line: no-string-literal
    const bookingFormArr: FormArray = this.bookingForm.controls['guests'] as FormArray;

    bookingFormArr.removeAt(ind);
  }

  /**
   * Displays the booking form modal. Sets the lodging property with the lodging selected.
   *
   * @param {MouseEvent} event Mouse event information. Used to stop propagation.
   * @param {Lodging} lodging Lodging selected.
   * @memberof BookingModalComponent
   */
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

  /**
   * Hides the booking form modal.
   *
   * @param {MouseEvent} [event] Mouse event information. Used to stop propagation.
   * @memberof BookingModalComponent
   */
  public closeModal(event?: MouseEvent): void {
    event?.stopPropagation();

    // Enable body scrolling.
    document.querySelector('html').classList.remove('is-clipped');

    this.bookingModal.nativeElement.classList.remove('is-active');
  }
}
