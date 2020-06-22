import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingModalComponent } from './booking-modal.component';
import { FormGroup, Validators, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Booking } from 'src/app/data/booking.model';
import { Lodging } from 'src/app/data/lodging.model';
import { BookingSearchData } from '../@types/booking-search-data';
import { mockBookings, mockLodgings, mockBookingSearchDataSet } from '../mock-booking-data';
import { Profile } from 'src/app/data/profile.model';
import { profile } from 'console';
import { Rental } from 'src/app/data/rental.model';
import { Stay } from 'src/app/data/stay.model';
import { ControlMessagesComponent } from 'src/app/layout/control-messages/control-messages.component';
import { checkServerIdentity } from 'tls';
import { ValidationService } from 'src/app/services/validation/validation.service';

describe('BookingModalComponent', () => {
  let component: BookingModalComponent;
  let fixture: ComponentFixture<BookingModalComponent>;

  let bookingModalDe: DebugElement;
  let bookingModalEl: HTMLElement;
  let expectedBooking: Booking;
  let expectedLodging: Lodging;
  let expectedBookingSearchData: BookingSearchData;
  const profileMock: Partial<Profile[]> = [];
  const rentalsMock: Rental[] = [];
  const stayMock: Partial<Stay> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingModalComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingModalComponent);
    component = fixture.componentInstance;

    // testing components with mock host input
    // https://angular.io/guide/testing#component-with-inputs-and-outputs

    bookingModalDe = fixture.debugElement.query(By.css('#booking-modal-form'));
    bookingModalEl = fixture.nativeElement;

    // mock input provided by parent component
    expectedBooking = mockBookings[0];
    expectedLodging = mockLodgings[0];
    expectedBookingSearchData = mockBookingSearchDataSet[0];

    // Simulate input for child component
    component.booking = expectedBooking;
    component.lodging = expectedLodging;
    component.searchData = expectedBookingSearchData;

    // Trigger binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit booking form', () => {
    component.openModal(mockLodgings[0]);
    component.bookingForm.setValue({
      stay: {
        checkIn: '2020-01-01',
        checkOut: '2020-02-01'
      },
      guests: {
        adults: 1,
        children: 1
      },
      rentals: [{
        id: 11,
        rentalUnit: {
          occupancy: 3,
          bathrooms: [],
          bedrooms: []
        }
      }]
    });
    fixture.detectChanges();
    expect(component.bookingForm.invalid).toBe(false);
    component.onBookingFormSubmit();
    expect((component.bookingForm.controls.stay as FormGroup).controls.checkIn.value).toBe('2020-01-01');
  });

  it('should open and close modal', () => {
    component.openModal(mockLodgings[0]);
    expect(component.bookingModal.nativeElement.classList).toContain('is-active');
    component.closeModal();
    expect(component.bookingModal.nativeElement.classList).not.toContain('is-active');

    component.openModal(null, mockBookings[0]);
    expect(component.bookingModal.nativeElement.classList).toContain('is-active');
    component.closeModal();
    expect(component.bookingModal.nativeElement.classList).not.toContain('is-active');
  });

  it('should not get valid rentals', () => {
    component.bookingForm = new FormGroup({
      stay: new FormGroup({
        checkIn: new FormControl(),
        checkOut: new FormControl()
      }, ValidationService.stayValidator),
      rentals: new FormControl()
    });

    component.bookingForm.controls['stay'].setValue({
      checkIn: '2020-04-04',
      checkOut: '2020-02-01'
    });

    component.getValidRentals();
    expect(component.rentals.length).toBe(0);
    expect(component.bookingForm.controls['stay'].valid).toBe(false);
  });

  it('should get valid rentals', () => {
    component.bookingForm = new FormGroup({
      stay: new FormGroup({
        checkIn: new FormControl(),
        checkOut: new FormControl()
      }, ValidationService.stayValidator),

      rentals: new FormControl()
    });

    component.bookingForm.controls['stay'].setValue({
      checkIn: '2020-01-01',
      checkOut: '2020-02-01'
    });

    component.getValidRentals();
    expect(component.bookingForm.controls['stay'].valid).toBe(true);
  });

});
