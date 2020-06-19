import { LodgingService } from './../../../services/lodging/lodging.service';
import { Component, OnInit } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';
import { HttpParams } from '@angular/common/http';
import { LodgingQueryParams } from '../@types/lodging-query-params';
import { FormGroup } from '@angular/forms';
import { LodgingSearchFormField } from '../lodging-search-form/lodging-search-form-field';
import Limit = LodgingQueryParams.Limit;

@Component({
  selector: 'uic-lodging',
  templateUrl: './lodging.component.html',
})
export class LodgingComponent implements OnInit {

  public lodgings: Lodging[];
  // Amount of lodgings to load at one time.
  private limit = 3;
  // Current offset for lodge pagination.
  private offset = 0;
  nxtPage=true;
  prevPage;
  private searchParams: HttpParams = new HttpParams();

  constructor(private lodgingService: LodgingService) {}

  nextPage() {
    if (this.lodgings.length > 0) {
      this.offset = this.offset + this.limit;
      this.loadLodgings();
    } else
    {
      this.nxtPage = false;
    }
    console.log(this.lodgings.length);
  }

  previousPage() {
    if (this.offset !== 0) {
      this.nxtPage = true;
      if (this.offset >= this.offset - this.limit) {
        this.offset = this.offset - this.limit;
      }
      this.loadLodgings();
    }
  }

  setOffset() {
    this.searchParams = this.searchParams.set(LodgingQueryParams.Offset, this.offset.toString());
  }

  ngOnInit(): void {
    this.loadLodgings();
  }

  loadLodgings() {
    this.setSearchLimit();
    this.setOffset();
    this.searchParams = this.searchParams.set(LodgingQueryParams.IncludeImages, true.toString());
    this.lodgingService.get(undefined, this.searchParams).subscribe(response => {
      if (response.length === 0) {
        this.nxtPage = false;
        this.offset = this.offset - this.limit;
        return;
      }
      if (this.offset !== 0) {
        this.prevPage = true;
      } else this.prevPage = false;
      this.lodgings = response;
    });
  }
  /**
   * Sets the limit for number of results that should be returned by the server.
   */
  setSearchLimit() {
    this.searchParams = this.searchParams.set(Limit, this.limit.toString());
  }
  /**
   * Fired when the search component is submitted.
   * @param queryParams Parameters generated by the search component.
   */
  onSearchSubmit(queryParams: HttpParams) {
    this.searchParams = queryParams;
    this.loadLodgings();
  }
}

