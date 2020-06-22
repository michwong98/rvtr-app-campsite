import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ValidationService } from '../../../services/validation/validation.service';

import { Profile } from 'src/app/data/profile.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking, BookingRental } from 'src/app/data/booking.model';
import { Lodging } from 'src/app/data/lodging.model';
import { BookingSearchData } from '../@types/booking-search-data';
import { Rental } from 'src/app/data/rental.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';

/**
 * A popup that will display a form to the user, once they've selected
 * a lodging, which will present the user with fields to fill out to
 * specify checkin-checkout dates and the number of guests to book.  The
 * form also provides a list of rentals available to book for User to choose.
 */
@Component({
  selector: 'uic-booking-modal',
  templateUrl: './booking-modal.component.html'
})
export class BookingModalComponent implements OnInit {
  /** Element reference for the booking modal html element. */
  @ViewChild('bookingModal') bookingModal: ElementRef;

  /** Form group for the booking form. */
  bookingForm: FormGroup;

  method: string;

  /** Booking object containing information on the current booking. */
  @Input() booking: Booking;

  /** Lodging object containing information on the current lodging. */
  @Input() lodging: Lodging;

  /** Search data information. */
  @Input() searchData: BookingSearchData;

  @Output() bookingsChange = new EventEmitter<Observable<Booking[]>>();

  /** Available rentals. */
  rentals: Rental[] = [];

  constructor(
    private readonly bookingService: BookingService,
    private readonly lodgingService: LodgingService
  ) { }

  ngOnInit(): void {
  }

  /** Used in template to access Math functions. */
  get Math() {
    return Math;
  }

  /** Creates a new booking form. Clears existing booking form information. */
  private newBookingForm(): void {

    // Creates a new booking form.
    this.bookingForm = new FormGroup({
      // Stay check in and check out.
      stay: new FormGroup({
        checkIn: new FormControl(
          this.booking !== null
            ? this.booking.stay.checkIn
            : this.searchData.checkIn.value),
        checkOut: new FormControl(
          this.booking !== null
            ? this.booking.stay.checkOut
            : this.searchData.checkOut.value)
      }, [Validators.required, ValidationService.stayValidator]),

      // Guests count.
      guests: new FormGroup({
        adults: new FormControl(1, [Validators.required, Validators.min(1)]),
        children: new FormControl(0, [Validators.required, Validators.min(0)])
      }, [ValidationService.guestsValidator]),

      // Rentals.
      rentals: new FormControl(null, [Validators.required])

      // Booking form validators.
    }, [ValidationService.rentalsValidator, ValidationService.occupancyValidator]);

    if (this.method === 'POST') {
      // Sets up booking properties.
      this.booking = {
        accountId: '1',
        lodgingId: this.lodging.id,
        stay: {},
        guests: [],
        bookingRentals: [],
        status: 'Valid'
      } as Booking;

      // Get available rentals.
      this.getValidRentals();

    } else if (this.method === 'PUT') {
      this.bookingForm.setValue({
        stay: {
          checkIn: this.booking.stay.checkIn,
          checkOut: this.booking.stay.checkOut
        },
        guests: {
          adults: this.booking.guests.reduce((acc, guest) => guest.age === 'Adult' ? acc + 1 : acc, 0),
          children: this.booking.guests.reduce((acc, guest) => guest.age === 'Child' ? acc + 1 : acc, 0)
        },
        rentals: null
      });
      this.getValidRentals();

    }

    // Listener for when stay form value changes.
    this.bookingForm.controls['stay'].valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe(() => this.getValidRentals());

    // Display error messages for guests and rentals.
    this.bookingForm.controls['guests'].markAsTouched();
    this.bookingForm.controls['rentals'].markAsTouched();
  }

  /**
   * Binding booking form data to booking object.
   * Sends an HTTP Post request to the API with the booking object.
   * @returns void
   */
  public onBookingFormSubmit(): void {
    if (this.bookingForm.invalid) {
      return;
    }

    // Sets the stay property for booking.
    const stayControls = this.bookingForm.controls['stay'] as FormGroup;
    this.booking.stay.checkIn = stayControls.controls['checkIn'].value;
    this.booking.stay.checkOut = stayControls.controls['checkOut'].value;

    this.booking.guests = [];

    // Sets the guests property for booking.
    const guestsControl = this.bookingForm.controls['guests'] as FormGroup;
    Array.from(new Array(guestsControl.controls['adults'].value)).forEach(() => {
      this.booking.guests.push({ age: 'Adult' } as Profile);
    });
    Array.from(new Array(guestsControl.controls['children'].value)).forEach(() => {
      this.booking.guests.push({ age: 'Child' } as Profile);
    });

    // Sets the rentals property for booking.
    this.bookingForm.controls['rentals'].value.forEach((rental: Rental) => {
      this.booking.bookingRentals.push({
        rentalId: rental.id
      } as BookingRental);
    });

    if (this.method === 'POST') {
      this.bookingService.post(this.booking)
        .subscribe(
          res => {
            console.log(res);
            this.closeModal();
          },
          err => alert('Failed to create booking.'),
          () => this.bookingsChange.emit(this.bookingService.get())
        );
    } else if (this.method === 'PUT') {
      this.bookingService.put(this.booking)
        .subscribe(
          res => {
            console.log(res);
            this.closeModal();
          },
          err => alert('Failed to update booking.'),
          () => this.bookingsChange.emit(this.bookingService.get())
        );
    }
  }

  /** Gets all rental units that are not occupied during the specified dates. */
  public getValidRentals(): void {
    const stayControls = this.bookingForm.controls['stay'] as FormGroup;
    if (stayControls.invalid) {
      this.bookingForm.controls['rentals'].setValue(null);
      this.rentals = [];
      return;
    }

    // Calcuates the available rentals with input check in and check out dates.
    const checkIn = stayControls.controls['checkIn'].value;
    const checkOut = stayControls.controls['checkOut'].value;
    this.bookingService.getStays(checkIn, checkOut, this.lodging.id).pipe(
      // Reduce stays to an array of rental unit ids.
      map(stays =>
        stays.reduce((occupiedRentals: string[], stay): string[] => {
          if (stay.booking.id !== this.booking.id) {
            stay.booking.bookingRentals.forEach(bookingRental => {
              occupiedRentals.push(bookingRental.rentalId);
            });
          }
          return occupiedRentals;
        }, [] as string[])
      ),
    ).subscribe((occupiedRentals) => {
      // Clear existing rentals selection.
      this.bookingForm.controls['rentals'].setValue(null);

      // Filter all rentals that do not have an id in occupied rentals.
      this.rentals = this.lodging.rentals.filter(rental => !occupiedRentals.includes(rental.id));

      // Select all available rentals that were selected before.
      if (this.method === 'PUT') {
        // Reduce to array of rental ids.
        const bookedRentals = this.booking.bookingRentals.reduce((acc: string[], bookingRental: BookingRental) => {
          acc.push(bookingRental.rentalId);
          return acc;
        }, []);

        // Select all previously selected rentals included in the available rentals.
        this.bookingForm.controls['rentals'].setValue(this.rentals.filter(rental => bookedRentals.includes(rental.id)));
      }
    });
  }

  /**
   * Displays the booking form modal.
   * @param lodging Lodging selected for booking
   */
  public openModal(lodging?: Lodging, booking?: Booking): void {
    // Sets lodging property.
    if (lodging) {
      this.method = 'POST';
      this.booking = null;
      this.lodging = lodging;
      this.newBookingForm();
    } else if (booking) {
      this.method = 'PUT';
      this.booking = booking;
      this.lodging = null;
      this.lodgingService.get(this.booking.lodgingId).subscribe(data => {
        this.lodging = data[0];
        this.newBookingForm();
      });
    }
    // Disable body scrolling.
    document.querySelector('html').classList.add('is-clipped');

    // Opens modal.
    this.bookingModal.nativeElement.classList.add('is-active');
  }

  /** Hides the booking form modal. */
  public closeModal(): void {
    // Enable body scrolling.
    document.querySelector('html').classList.remove('is-clipped');

    this.bookingModal.nativeElement.classList.remove('is-active');

    this.method = null;
    this.booking = null;
    this.lodging = null;
    this.rentals = [];
  }

  public getRentalUnitModel(id: string) {
    return this.rentals.find(x => x.id === id)?.rentalUnit;
  }
}
