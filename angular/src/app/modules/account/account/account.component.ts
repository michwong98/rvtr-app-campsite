import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { Account } from '../../../data/account.model';
import { Review } from '../../../data/review.model';
import { Booking } from '../../../data/booking.model';
import { ActivatedRoute } from '@angular/router';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';


@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  
  data: Account;
  bookings: Booking[];
  bookingLocations:string[]=[];
  reviews: Review[]; 
  reviewLocations: string[]=[];

  dummyGetBookings(){
    this.AccSer.dummyGetBookings("yo").subscribe(books => this.bookings = books);
    for(let i=0;i<2;i++)
    {
      this.LodgServ.get(this.bookings[i].lodgingId.toString())
      .subscribe(lodge=>this.bookingLocations.push(lodge[0].name));
    }
  }

  dummyGetReviews(){
    this.AccSer.dummyGetReveiws("hi").subscribe( val => this.reviews = val);
    for(let i=0;i<2;i++)
    {
      this.LodgServ.get(this.reviews[i].hotelId.toString())
      .subscribe(lodge=>this.reviewLocations.push(lodge[0].name));
    }
  }

  dummyGet(){
    let x=1;
    //const x = +this.route.snapshot.paramMap.get('id');
    this.AccSer.get("x").subscribe(data => this.data = data[0]);
    this.obscure();
  }

  obscure(){
    for(let i = 0; i < this.data.payments.length; i++){
      this.data.payments[i].cardNumber = "***********"+ this.data.payments[i].cardNumber.substring(11,16);
    }
  }

  constructor(private AccSer: AccountService,
              private route: ActivatedRoute,
              private LodgServ: LodgingService,
              ) {}

  ngOnInit(): void {
    this.dummyGet();
    this.dummyGetReviews();
    this.dummyGetBookings();
  }

}
