import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';

import { Booking } from '../../../data/booking.model';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  lodgings$: Observable<Lodging[]>;

  @ViewChild(BookingModalComponent) bookingModal: BookingModalComponent;
  bookingForm: FormGroup;

  lodging: Lodging;
  booking: Booking;

  searchForm: FormGroup;

  constructor(private lodgingService: LodgingService) {}

  ngOnInit(): void {
    this.lodgings$ = this.lodgingService.get();
  }
}
