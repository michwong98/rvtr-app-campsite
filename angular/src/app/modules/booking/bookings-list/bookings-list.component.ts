import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uic-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {

  constructor(private bookingsService: BookingService) { }

  ngOnInit(): void {
  }

}
