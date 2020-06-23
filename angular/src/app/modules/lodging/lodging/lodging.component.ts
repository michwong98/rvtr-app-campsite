import { Review } from './../../../data/review.model';
import { LodgingService } from './../../../services/lodging/lodging.service';
import { Component, OnInit } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { HttpParams } from '@angular/common/http';
import { LodgingQueryParams } from '../@types/lodging-query-params';
import { Observable } from 'rxjs';
import { AccountService } from '../../../services/account/account.service';
import { Account } from '../../../data/account.model';

@Component({
  selector: 'uic-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.scss']
})
export class LodgingComponent implements OnInit {

  // y-offset of the beginning of the lodge search results.
  // This is used to set the view to the first result when changing pages.
  public lodgeSearchResultYOffset = 157;

  // The number of lodges that should be displayed at one time.
  public pageSize = 2;

  // The last index that can be displayed.
  // This is used to hide the "next page" button.
  public lastPageIndex = 0;

  // All the lodgings that have been loaded.
  public lodgingCache: Lodging[] = [];

  // Lodgings to be displayed on the page.
  public lodgings: Lodging[] = [];
  // Used for indexing into the lodgingCache for page display.
  public currentPageIndex = 0;

  // User-defined search params.
  public searchParams: HttpParams = new HttpParams();

  // Whether all lodges from the server have been loaded.
  public allLodgesLoaded = false;

  // User account currently logged-in.
  public account: Account;

  constructor(
    private readonly lodgingService: LodgingService,
    private readonly accountService: AccountService
  ) { }


  ngOnInit(): void {
    this.prefetchLodgings().subscribe(response => {
      this.processLodgeResponse(response);
      this.renderLodgesFromCache(0, this.pageSize);
    });

    this.accountService.get('1').subscribe(res => {
      if (res.length > 0)
      {
        this.account = res[0];
      } else {
        this.account = {
          id: '1',
          address: {
            id: '1',
            city: 'Dallas',
            country: 'US',
            postalCode: '77777',
            stateProvince: 'Texas',
            street: '123 Testing st.',
            unit: '',
          },
          name: 'Lucy C.',
          payments: [],
          profiles: [],
        };
      }
    });
  }

  /**
   * Moves the view to the top of the page.
   */
  pageViewToFirstResult(): void
  {
    window.scrollTo(0, this.lodgeSearchResultYOffset);
  }

  /**
   * Go forward a page.
   */
  nextPage() {
    this.currentPageIndex += this.pageSize;

    const render = () => {
      // Pick the appropriate lodge entries from the cache for rendering.
      this.renderLodgesFromCache(this.currentPageIndex, this.currentPageIndex + this.pageSize);
    };

    // We prefetch one page ahead in order to increase the responsiveness
    // of the application by multiplying the page size by 2.
    if (this.lodgingCache.length < (this.currentPageIndex + (this.pageSize * 2))) {
      if (!this.allLodgesLoaded) {
        this.prefetchLodgings().subscribe(response => {
          this.processLodgeResponse(response);
          render();
        });
      }
    }
    render();
  }

  /**
   * Go back a page.
   */
  previousPage() {
    this.currentPageIndex -= this.pageSize;
    this.renderLodgesFromCache(this.currentPageIndex, this.currentPageIndex + this.pageSize);
  }

  /**
   * Copies a slice from the lodge cache into the lodge variable that is used
   * for rendering.
   * @param start index to start the slice
   * @param end index to end the slice
   */
  renderLodgesFromCache(start: number, end: number): void {
    this.lodgings = this.lodgingCache.slice(start, end);
  }

  /**
   * Updates the lodge cache, and sets appropriate indexing and pagination
   * variables.
   * @param response Lodgings returned from prefetchLodgings
   */
  processLodgeResponse(response: Lodging[]) {
    // Show the most recent reviews first.
    response.forEach(lodge => {
      const compareDescending = (lhs: Review, rhs: Review): number => {
        const lhsEpoch = new Date(lhs.dateCreated).getTime();
        const rhsEpoch = new Date(rhs.dateCreated).getTime();
        return rhsEpoch - lhsEpoch;
      };
      if (lodge.reviews) {
        lodge.reviews.sort(compareDescending);
      }
    });

    // Add the new lodgings to the cache.
    this.lodgingCache = this.lodgingCache.concat(response);
    // Mark the last page available based on the response.
    this.lastPageIndex = this.lodgingCache.length - this.pageSize;
    // When the response is empty or less than the page size, this
    // means we have run out of lodges, so set a flag to indicate this.
    if (response.length < this.pageSize) {
      this.allLodgesLoaded = true;
    }
  }

  /**
   * Returns an observable that will load the number of lodges required
   * to fill two pages.
   */
  prefetchLodgings(): Observable<Lodging[]> {
    // We load double the page size for faster user-interaction.
    this.searchParams = this.searchParams.set(LodgingQueryParams.Limit, (this.pageSize * 2).toString());

    // The offset for loading results will always be the cache size.
    this.searchParams = this.searchParams.set(LodgingQueryParams.Offset, this.lodgingCache.length.toString());

    // Include image data in the results.
    this.searchParams = this.searchParams.set(LodgingQueryParams.IncludeImages, true.toString());

    return this.lodgingService.get(undefined, this.searchParams);
  }

  /**
   * Resets the state of the page. Used when processing search requests.
   */
  resetPage() {
    this.lastPageIndex = 0;
    this.lodgingCache = [];
    this.lodgings = [];
    this.currentPageIndex = 0;
    this.allLodgesLoaded = false;
  }

  /**
   * Fired when the search component is submitted.
   * @param queryParams Parameters generated by the search component.
   */
  onSearchSubmit(queryParams: HttpParams) {
    this.resetPage();
    this.searchParams = queryParams;
    this.prefetchLodgings().subscribe(response => {
      this.processLodgeResponse(response);
      this.renderLodgesFromCache(0, this.pageSize);
    });
  }

  getIconName(amenity: string): string {
    if (amenity === 'Pool') {
      return 'swimmer';
    }
    else {
      return amenity.toLowerCase();
    }
  }

}
