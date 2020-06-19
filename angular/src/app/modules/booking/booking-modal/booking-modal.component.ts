import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { getNewDateFromNowBy, formatDate } from '../utils/date-helpers';

import { ValidationService } from '../../../services/validation/validation.service';

import { Profile } from 'src/app/data/profile.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/data/booking.model';
import { Lodging } from 'src/app/data/lodging.model';
import { BookingSearchData } from '../@types/booking-search-data';
import { RentalUnit } from 'src/app/data/rental-unit.model';
import { Rental } from 'src/app/data/rental.model';
import { Stay } from 'src/app/data/stay.model';

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
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.newBookingForm();
  }

  /**
   * Used in template to access Math functions.
   */
  get Math() {
    return Math;
  }

  /**
   * Creates a new booking form. Clears existing booking form information.
   */
  private newBookingForm(): void {
    // Sets up booking properties.
    this.booking = {
      stay: {},
      guests: [],
      rentals: [],
    } as Booking;

    // Creates a new booking form.
    this.bookingForm = new FormGroup({

      stay: new FormGroup({
        checkIn: new FormControl(
          this.searchData.checkIn.value
            ? this.searchData.checkIn.value
            : formatDate(getNewDateFromNowBy(1))),
        checkOut: new FormControl(
          this.searchData.checkOut.value
            ? this.searchData.checkOut.value
            : formatDate(getNewDateFromNowBy(1)))
      }, []),

      // Guests count.
      guests: new FormGroup({
        adults: new FormControl(1, [Validators.required, Validators.min(1)]),
        children: new FormControl(0, [Validators.required, Validators.min(0)])
      }, [ValidationService.guestsValidator]),

      // Rentals.
      rentals: new FormControl(null, [Validators.required]),
      
    }, [ValidationService.rentalsValidator, ValidationService.occupancyValidator]);

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
    this.booking.accountId = this.lodging.id;
    this.booking.status = 'Valid';

    // Sets the stay property for booking.
    const stayControls = this.bookingForm.controls['stay'] as FormGroup;
    this.booking.stay.checkIn = stayControls.controls['checkIn'].value;
    this.booking.stay.checkOut = stayControls.controls['checkOut'].value;

    // Sets the guests property for booking.
    const guestsControl = this.bookingForm.controls['guests'] as FormGroup;
    Array.from(new Array(guestsControl.controls['adults'].value + guestsControl.controls['children'].value)).forEach(() => {
      this.booking.guests.push({} as Profile);
      // TODO: Set age of each profile.
    });

    // Sets the rentals property for booking.
    this.bookingForm.controls['rentals'].value.forEach((rental: Rental) => {
      this.booking.rentals.push({
        id: rental.id
      } as Rental)
    });

    // TODO: send data as request
    this.closeModal();
    this.bookingService.post(this.booking).subscribe(
      () => console.log(this.booking)
    );
  }

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
