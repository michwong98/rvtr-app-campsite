import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { Profile } from 'src/app/data/profile.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/data/booking.model';
import { getNewDateFromNowBy, formatDate } from '../utils/date-helpers';
import { Lodging } from 'src/app/data/lodging.model';
import { Stay } from 'src/app/data/stay.model';

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
  ) {}

  ngOnInit(): void {
    this.newBookingForm();
  }

  get f() {
    return this.bookingForm.controls;
  }

  private newBookingForm(): void {
    this.bookingForm = this.formBuilder.group({
      guests: this.formBuilder.array([]),
      checkIn: [formatDate(getNewDateFromNowBy(1)), Validators.required],
      checkOut: [formatDate(getNewDateFromNowBy(2)), Validators.required],
    });

    const guests = this.searchData?.guests?.value ? this.searchData.guests.value : 0;

    for (let i = 0; i < guests; i++) {
      this.addNextGuestItem();
    }
  }

  createGuestItem(): FormGroup {
    return this.formBuilder.group({
      given: ['', Validators.required],
      family: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });
  }

  addNextGuestItem(): void {
    // tslint:disable-next-line: no-string-literal
    (this.bookingForm.controls['guests'] as FormArray).push(this.createGuestItem());
  }

  removeGuessItem(ind: number): void {
    // tslint:disable-next-line: no-string-literal
    const bookingFormArr: FormArray = this.bookingForm.controls['guests'] as FormArray;

    // Ensure there's alawys one
    if (bookingFormArr.length <= 0) {
      return;
    }

    bookingFormArr.removeAt(ind);
  }

  public openModal(event: MouseEvent, lodging?: Lodging): void {
    event?.stopPropagation();
    console.log('clack');

    this.bookingModal.nativeElement.classList.add('is-active');

    this.newBookingForm();

    if (lodging !== null) {
      this.booking = {
        guests: [],
        stay: {} as Stay
      } as Booking;
      this.booking.lodgingId = lodging.id;
    }
  }

  public closeModal(event: MouseEvent): void {
    event?.stopPropagation();
    this.bookingModal.nativeElement.classList.remove('is-active');
  }

  onBookingFormSubmit(): void {
    // TODO: set booking submitted state
    if (this.bookingForm.invalid) {
      // TODO: display invalidation message to user
      console.error('Invalid booking form');
      return;
    }

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

    this.booking.stay.checkIn = this.searchData.checkIn.value;
    this.booking.stay.checkOut = this.searchData.checkOut.value;

    // TODO: send data as request
    console.log(this.booking);
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
