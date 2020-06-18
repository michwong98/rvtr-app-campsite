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
import { RentalUnit } from 'src/app/data/rental-unit.model';
import { Rental } from 'src/app/data/rental.model';

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
   * Used in template to access Math functions.
   *
   */
  get Math() {
    return Math;
  }

  /**
   * Creates a new booking form. Clears existing booking form information.
   *
   */
  private newBookingForm(): void {
    // Sets up booking properties.
    this.booking = {
      stay: {},
      guests: [],
      rentals: [],
    } as Booking;

    const guests = this.searchData?.guests?.value ? this.searchData.guests.value : 0;

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

      // Guests count.
      guests: new FormGroup({
        adults: new FormControl(null, Validators.required),
        children: new FormControl(null, Validators.required)
      }, ValidationService.guestsValidator),

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
   * @returns void
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
    const guestsControl = this.bookingForm.controls['guests'] as FormGroup;
    Array.from(new Array(guestsControl.controls['adults'].value + guestsControl.controls['children'].value)).forEach(() => {
      this.booking.guests.push({} as Profile);
    });

    // Sets the rentals property for booking.
    this.bookingForm.controls['rentals'].value.forEach((rental: Rental) => {
      this.booking.rentals.push({
        rentalUnit: {
          id: rental.rentalUnit.id
        } as RentalUnit
      } as Rental)
    });

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
   */
  addNextGuestItem(): void {
    // tslint:disable-next-line: no-string-literal
    (this.bookingForm.controls['guests'] as FormArray).push(this.createGuestItem() as FormGroup);
  }

  /**
   * Remove guest information form group.
   *
   * @param ind Index of the form group to remove.
   */
  removeGuestItem(ind: number): void {
    // tslint:disable-next-line: no-string-literal
    const bookingFormArr: FormArray = this.bookingForm.controls['guests'] as FormArray;

    bookingFormArr.removeAt(ind);
  }

  /**
   * Displays the booking form modal. Sets the lodging property with the lodging selected.
   *
   * @param event Mouse event information. Used to stop propagation.
   * @param lodging Lodging selected.
   */
  public openModal(event: MouseEvent, lodging: Lodging): void {
    if (event) {
      event.stopPropagation();
    }

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
   * @param event Mouse event information. Used to stop propagation.
   */
  public closeModal(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    // Enable body scrolling.
    document.querySelector('html').classList.remove('is-clipped');

    this.bookingModal.nativeElement.classList.remove('is-active');
  }
}
