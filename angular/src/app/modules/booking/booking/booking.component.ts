import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';

import { BookingService } from '../../../services/booking/booking.service';
import { Booking } from '../../../data/booking.model';

@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
  lodgings$: Observable<Lodging[]>;

  constructor(private lodgingService: LodgingService, private bookingService: BookingService) {
  }

  ngOnInit(): void { }
}
