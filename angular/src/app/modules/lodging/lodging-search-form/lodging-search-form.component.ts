import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LodgingSortKey } from '../@types/lodging-sort-key';
import { SortOrder } from '../@types/sort-order';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { LodgingSearchFormField } from './lodging-search-form-field';
import { LodgingQueryParams } from '../@types/lodging-query-params';

@Component({
  selector: 'uic-lodging-search-form',
  templateUrl: './lodging-search-form.component.html',
  styleUrls: ['./lodging-search-form.scss']
})
export class LodgingSearchFormComponent implements OnInit {

  @Output() submitted = new EventEmitter<HttpParams>();

  public sortByFields: {name: string, value: LodgingSortKey }[] = [
    { name: 'Average rating', value: LodgingSortKey.ReviewAverageRating },
    { name: 'Number of reviews', value: LodgingSortKey.ReviewCount },
    { name: 'Number of beds', value: LodgingSortKey.Beds },
    { name: 'Number of baths', value: LodgingSortKey.Bathrooms },
    { name: 'Max occupancy', value: LodgingSortKey.Occupancy },
    { name: 'Name', value: LodgingSortKey.Name },
  ];

  public sortOrderFields: {name: string, value: SortOrder }[] = [
    { name: 'Descending', value: SortOrder.Descending },
    { name: 'Ascending', value: SortOrder.Ascending },
  ];

  searchForm = new FormGroup({
    city: new FormControl(''),
    name: new FormControl(''),
    beds: new FormControl(''),
    baths: new FormControl(''),
    rating: new FormControl(''),
    sortBy: new FormControl(LodgingSortKey.ReviewAverageRating),
    orderBy: new FormControl(SortOrder.Descending),
  });


  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted.emit(this.generateQueryParams());
  }

  generateQueryParams(): HttpParams {
    let params = new HttpParams();

    const city = this.searchForm.get(LodgingSearchFormField.City).value;
    if (city) {
      params = params.set(LodgingQueryParams.City, city.toString());
    }

    const name = this.searchForm.get(LodgingSearchFormField.Name).value;
    if (name) {
      params = params.set(LodgingQueryParams.Name, name.toString());
    }

    const beds = this.searchForm.get(LodgingSearchFormField.Beds).value;
    if (beds) {
      params = params.set(LodgingQueryParams.BedsAtLeast, beds.toString());
    }

    const baths = this.searchForm.get(LodgingSearchFormField.Baths).value;
    if (baths) {
      params = params.set(LodgingQueryParams.BathsAtLeast, baths.toString());
    }

    const rating = this.searchForm.get(LodgingSearchFormField.Rating).value;
    if (rating) {
      params = params.set(LodgingQueryParams.RatingAtLeast, rating.toString());
    }

    const sortBy = this.searchForm.get(LodgingSearchFormField.SortBy).value;
    params = params.set(LodgingQueryParams.SortKey, sortBy);

    const orderBy = this.searchForm.get(LodgingSearchFormField.OrderBy).value;
    params = params.set(LodgingQueryParams.SortOrder, orderBy);

    return params;
  }
}
