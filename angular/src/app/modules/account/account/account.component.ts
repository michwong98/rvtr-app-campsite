import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { Account } from '../../../data/account.model';
import { Review } from '../../../data/review.model';
import { Booking } from '../../../data/booking.model';


@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  
  data: Account;
  reviews: Review[]; 
  bookings: Booking[];
  constructor(private AccSer: AccountService) {}

  ngOnInit(): void {
    this.dummyGet();
    this.dummyGetReviews();
    this.dummyGetBookings();
  }

  dummyGetBookings(){
    this.AccSer.dummyGetBookings("yo").subscribe(books => this.bookings = books);
    console.log(this.bookings);
  }

  dummyGet(){
    this.AccSer.get("hey dummy").subscribe(data => this.data = data);
    this.obscure();
  }

  obscure(){
    for(let i = 0; i < this.data.payments.length; i++){
      this.data.payments[i].cardNumber = "***********"+ this.data.payments[i].cardNumber.substring(11,16);
    }

  }
  dummyGetReviews(){
    this.AccSer.dummyGetReveiws("hi").subscribe( val => this.reviews = val);
  }
}
