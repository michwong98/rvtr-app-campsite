import { Component, OnInit } from '@angular/core';
import { Review } from '../../../data/review.model';
import { ReviewService } from '../../../services/lodging/review.service';
import { HttpParams } from '@angular/common/http';
import { ReviewQueryParams } from '../@types/review-query-params';
import { ReviewSortKey } from '../@types/review-sort-key';
import { SortOrder } from '../@types/sort-order';

@Component({
  selector: 'uic-lodging-review-list',
  templateUrl: './lodging-review-list.component.html',
  styleUrls: ['./lodging-review-list.component.scss']
})
export class LodgingReviewListComponent implements OnInit {

  public reviews: Review[] = [];
  public limit = 3;
  public offset = 0;
  public allReviewsLoaded = false;
  public lodgeId = 0;

  constructor(private readonly reviewService: ReviewService) { }

  ngOnInit(): void { }

  loadReviews(): void {
    this.loadMore();
  }

  loadMore(): void {
    let params = new HttpParams();
    params = params.set(ReviewQueryParams.Limit, this.limit.toString());
    params = params.set(ReviewQueryParams.Offset, this.offset.toString());
    params = params.set(ReviewQueryParams.LodgingId, this.lodgeId.toString());
    params = params.set(ReviewQueryParams.SortKey, ReviewSortKey.DateCreated);
    params = params.set(ReviewQueryParams.SortOrder, SortOrder.Descending);

    this.reviewService.get(undefined, params).subscribe(response => {

      this.reviews = this.reviews.concat(response);

      this.offset += this.limit;

      if (this.offset > this.reviews.length) {
        this.allReviewsLoaded = true;
      }
    });
  }

  public reset(): void {
    this.reviews = [];
    this.offset = 0;
    this.allReviewsLoaded = false;
    this.lodgeId = 0;
  }

  public setLodgeId(id: number): void {
    this.lodgeId = id;
  }

}
