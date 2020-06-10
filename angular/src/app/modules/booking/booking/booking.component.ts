import { Component, OnInit } from '@angular/core';
import {Booking} from '../../../data/booking.model';
import {BookingService} from '../../../services/booking/booking.service';

import {Lodging} from '../../../data/lodging.model';
import {LodgingService} from '../../../services/lodging/lodging.service';

@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
  //private bookings: Booking[];
  private lodgings: Lodging[];
  constructor(private lodgingService: LodgingService) {}

  ngOnInit(){
    this.getLodgings();
  }
  getLodgings(): void{
    this.lodgingService.get()
      .subscribe(lodgings => this.lodgings = lodgings )
  }
  

}
