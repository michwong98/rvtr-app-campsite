import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getNewDateFromNowBy, formatDate } from '../utils/date-helpers';

import { LodgingService } from '../../../services/lodging/lodging.service';
import { Lodging } from '../../../data/lodging.model';

@Component({
  selector: 'uic-booking-search-form',
  templateUrl: './booking-search-form.component.html'
})
export class BookingSearchFormComponent implements OnInit {

  constructor(private readonly formBuilder: FormBuilder, private readonly lodgingService: LodgingService) { }

  @Input() searchForm: FormGroup;
  @Input() lodgings$: Observable<Lodging[]>;
  @Output() lodgingsChange = new EventEmitter<Observable<Lodging[]>>();

  ngOnInit(): void {
    // Set fields for form group
    this.searchForm = this.formBuilder.group({
      location: [''],
      checkIn: [formatDate(getNewDateFromNowBy(1)), Validators.required],
      checkOut: [formatDate(getNewDateFromNowBy(2)), Validators.required],
      guests: [1, Validators.required],
    });
  }

  /**
   * Filters lodgings by search form's location value.
   */
  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.retreiveLodgingsByPhrase(this.searchForm.controls.location.value);

    // TODO: submit form data to http request
  }

  /**
   * Filter's results recieved from test observable using a given phrase
   * @param phrase String used to filter results
   */
  retreiveLodgingsByPhrase(phrase: string): void {
    // Return all results if string is empty
    if (!phrase.length) {
      this.lodgings$ = this.lodgingService.get();
      this.lodgingsChange.emit(this.lodgings$);
      return;
    }
    this.lodgings$ = this.lodgingService.get().pipe(
      // return the list of lodgings filtered by the phrase
      map((lodgings) =>
        lodgings.filter((l) =>
          `${l.location.address.street}, ${l.location.address.city}, ${l.location.address.stateProvince}`.includes(
            phrase
          )
        )
      )
    );
    this.lodgingsChange.emit(this.lodgings$);
  }
}
