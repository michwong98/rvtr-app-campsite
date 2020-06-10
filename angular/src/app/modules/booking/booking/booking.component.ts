import { Component, OnInit } from '@angular/core';
import { Observable, of, concat } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';

import { BookingService } from '../../../services/booking/booking.service';
import { Booking } from '../../../data/booking.model';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  lodgings$: Observable<Lodging[]>;
  lodgings: Lodging[];

  /**
   * State used to determine if form was submitted
   */
  submitted: boolean;
  /**
   * State used to determine if awaiting for data from AJAX request
   */
  laoding: boolean;
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private lodgingService: LodgingService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    // Set fields for form group
    this.searchForm = this.formBuilder.group({
      location: [''],
      checkIn: [this.formatDate(this.getNewDateFromNowBy(1)), Validators.required],
      checkOut: [this.formatDate(this.getNewDateFromNowBy(2)), Validators.required],
      adults: [1, Validators.required],
      children: [0, Validators.required],
    });

    this.lodgings$ = this.testLodgingsObservable();
  }

  /**
   * Filter's results recieved from test observable using a given phrase
   * @param phrase String used to filter results
   */
  retreiveLodgingsByPhrase(phrase: string): void {
    // Return all results if string is empty
    if (!phrase.length) {
      this.lodgings$ = this.testLodgingsObservable();
      return;
    }

    this.lodgings$ = this.testLodgingsObservable().pipe(
      // return the list of lodgings filtered by the phrase
      map((lodgings) =>
        lodgings.filter((l) =>
          `${l.location.address.street}, ${l.location.address.city}, ${l.location.address.country}`.includes(
            phrase
          )
        )
      )
    );
  }

  /**
   * convencience getter for easy access to form fields
   */
  get f() {
    return this.searchForm.controls;
  }

  /**
   * Submits seach data to httpRequest
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.searchForm.invalid) {
      console.error('Invalid form submission');
      return;
    }

    this.retreiveLodgingsByPhrase(this.f.location.value);

    // TODO: submit form data to http request
    console.log('Submitted...');
  }

  /**
   * Formats the provided date to be used in the date input
   * @param date The `Date` to format
   * @see https://stackoverflow.com/questions/57198151/how-to-set-the-date-in-angular-reactive-forms-using-patchvalue
   */
  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  /**
   * Gets the date set to the amount of months specified to jump ahead
   * @param numMonths number of months to jump ahead
   * @param numDays number of days to jump ahead
   * @returns New date set from numMonths months from now and numDays days
   * @see https://stackoverflow.com/questions/499838/javascript-date-next-month
   */
  private getNewDateFromNowBy(numMonths: number, numDays: number = 7): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + numMonths, now.getDate() + numDays);
  }

  private testLodgingsObservable(): Observable<Lodging[]> {
    let dummyLodgings: Lodging[] = [
      { id: '', name: 'My Lodging', rentals: [], reviews: [], location: { id: '',address: { id: '', city: 'New York', country: 'USA', postalCode: '10001', stateProvince: 'NY', street: '7421 Something Dr', }, latitude: '', longitude: '', locale: '', }, },
      { id: '', name: 'My Lodge', rentals: [], reviews: [], location: { id: '',address: { id: '', city: 'New York', country: 'USA', postalCode: '10005', stateProvince: 'NY', street: '4212 Whatever Something St', }, latitude: '', longitude: '', locale: '', }, },
      { id: '', name: 'Your Lodging', rentals: [], reviews: [], location: { id: '',address: { id: '', city: 'New York', country: 'USA', postalCode: '10003', stateProvince: 'NY', street: '4290 More St', }, latitude: '', longitude: '', locale: '', }, },
      { id: '', name: 'Whose Lodging', rentals: [], reviews: [], location: { id: '',address: { id: '', city: 'New York', country: 'USA', postalCode: '10002', stateProvince: 'NY', street: '4282 Someone Av', }, latitude: '', longitude: '', locale: '', }, },
      { id: '', name: 'Mine Lodging', rentals: [], reviews: [], location: { id: '',address: { id: '', city: 'New York', country: 'USA', postalCode: '10001', stateProvince: 'NY', street: '7320 Something Dr', }, latitude: '', longitude: '', locale: '', }, },
      { id: '', name: 'My House', rentals: [], reviews: [], location: { id: '',address: { id: '', city: 'Los Angeles', country: 'USA', postalCode: '90030', stateProvince: 'CA', street: '5421 Whatever Dr', }, latitude: '', longitude: '', locale: '', }, },
    ];
    return of(dummyLodgings).pipe(delay(1000));
  }
}
