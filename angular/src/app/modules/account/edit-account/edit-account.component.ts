import { Component, OnInit } from '@angular/core';
import { Account } from '../../../data/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { Payment } from 'src/app/data/payment.model';
import { Profile } from 'src/app/data/profile.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'uic-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  data:Account;

  addCard(cardName:string,cardNumberr:number,cardExpi:Date){
    let newCard:Payment = {
      id:null,
      cardExpirationDate:cardExpi,
      cardName:cardName,
      cardNumber:cardNumberr.toString()
    }
    this.data.payments.push(newCard);
  }

  removeCard(card){
    this.data.payments
    .splice(this.data.payments.indexOf(card),1);
  }

  addProfile(firstName:string,lastName:string,age:"Adult"|"Child",email:string,phone:number){
    let newProfile:Profile = {
      id:null,
      email:email,
      phone:phone.toString(),
      age:age,
      name:{
        id:null,
        family:lastName,
        given:firstName
      }
    }
    this.data.profiles.push(newProfile);
  }

  removeProfile(profile){
    this.data.profiles
    .splice(this.data.payments.indexOf(profile),1);
  }

  obscure(){
    for(let i = 0; i < this.data.payments.length; i++){
      this.data.payments[i].cardNumber = "***********"+ this.data.payments[i].cardNumber.substring(11,16);
    }
  }
  
  //directed from the view account page with unique id
  get(){
    const x = +this.route.snapshot.paramMap.get('id');
    this.AccServ.get(x.toString()).subscribe(data => this.data = data[0]);
    this.obscure();
  }

  onSubmit(){
    this.AccServ.put(this.data).subscribe(
      success=>console.log('success: ', this.data),
      error=>console.log('error'));
  }

  constructor(private AccServ: AccountService,
              private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.get();
  }
}
