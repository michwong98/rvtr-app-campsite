import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookingsListComponent } from './bookings-list.component';
import { Booking } from 'src/app/data/booking.model';
import { subscribeOn } from 'rxjs/operators';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Observable, of } from 'rxjs';
import { mockBookings } from '../mock-booking-data';
import { BookingComponent } from '../booking/booking.component';
import { Data } from '@angular/router';

describe('BookingsListComponent', () => {
  let component: BookingsListComponent;
  let fixture: ComponentFixture<BookingsListComponent>;
  const bookingMock: Partial<Booking> = {
    id: '0',
  };

  const bookingServiceMock = {
    get(id?: string) {
      return of([] as Booking[]);
    },
    delete(booking: Booking) {
      return of(true);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsListComponent],
      providers: [{ provide: BookingService, useValue: bookingServiceMock }],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete booking', () => {
    const bookingSpy = spyOn(bookingServiceMock, 'delete').and.returnValue(of(true));
    const getBookingSpy = spyOn(component, 'getBookings');
    component.deleteBooking(bookingMock as Booking);
    fixture.detectChanges();
    expect(bookingSpy).toHaveBeenCalled();
    expect(getBookingSpy).toHaveBeenCalled();
  });

  it('should get bookings', () => {
    const bookingSpy = spyOn(component, 'getBookings');
    component.getBookings();
    expect(bookingSpy).toHaveBeenCalled();
  });

  it('should edit bookings', () => {
    const bookingEventEmitter = spyOn(component.bookingClickHandler, 'emit');
    component.editBooking(bookingMock as Booking);
    expect(bookingEventEmitter).toHaveBeenCalled();
  });
});
