import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/data/booking.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'uic-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Set fields for form group
    this.searchForm = this.formBuilder.group({
      location: [''],
      checkIn: [this.formatDate(this.getNewDateFromNowBy(1))],
      checkOut: [this.formatDate(this.getNewDateFromNowBy(2))],
      adults: [1],
      children: [0],
    });
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
}
