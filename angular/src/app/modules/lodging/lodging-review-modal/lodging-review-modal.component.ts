import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LodgingReviewListComponent } from '../lodging-review-list/lodging-review-list.component';
import { LodgingAddReviewComponent } from '../lodging-add-review/lodging-add-review.component';
import { Lodging } from '../../../data/lodging.model';
import { Account } from '../../../data/account.model';

@Component({
  selector: 'uic-lodging-review-modal',
  templateUrl: './lodging-review-modal.component.html'
})
export class LodgingReviewModalComponent implements OnInit {

  @ViewChild('lodgingReviewModal') lodgingReviewModal: ElementRef;
  @ViewChild(LodgingReviewListComponent) lodgingReviewList: LodgingReviewListComponent;
  @ViewChild(LodgingAddReviewComponent) lodgingAddReviewComponent: LodgingAddReviewComponent;

  addingReview = false;

  constructor() { }

  ngOnInit(): void {
  }

  public openModal(event: MouseEvent, lodge: Lodging, account: Account): void {
    if (event) {
      event.stopPropagation();
    }
    this.lodgingReviewModal.nativeElement.classList.add('is-active');

    if (this.lodgingReviewList)
    {
      this.lodgingReviewList.reset();
      this.lodgingReviewList.setLodgeId(parseInt(lodge.id, 10));
      this.lodgingReviewList.loadReviews();
    }

    if (this.lodgingAddReviewComponent)
    {
      this.lodgingAddReviewComponent.reset();
      this.lodgingAddReviewComponent.setAccount(account);
      this.lodgingAddReviewComponent.setLodge(lodge);
    }
  }

  public closeModal(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.lodgingReviewModal.nativeElement.classList.remove('is-active');
  }

  /**
   * This is fired when a user submits a review.
   */
  public reviewSubmitted(): void {
    this.closeModal();
  }
}
