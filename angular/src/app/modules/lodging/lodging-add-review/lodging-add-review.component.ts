import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from './../../../services/lodging/review.service';
import { Review } from '../../../data/review.model';
import { Account } from '../../../data/account.model';

@Component({
  selector: 'uic-lodging-add-review',
  templateUrl: './lodging-add-review.component.html',
})
export class LodgingAddReviewComponent implements OnInit {

  /**
   * Event fired when the review has been submitted by the user.
   */
  @Output() submitted = new EventEmitter<boolean>();

  reviewForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required
    ]),
    rating: new FormControl(Number, [
      Validators.required,
      Validators.max(10),
      Validators.min(0)
    ]),
  });

  get ratingField() { return this.reviewForm.get('rating'); }
  get commentField() { return this.reviewForm.get('comment'); }

  public account: Account;
  public lodge: Lodging;

  currentDate = new Date(Date.now());

  constructor(private readonly reviewService: ReviewService) { }
  ngOnInit(): void { }

  /**
   * Determines if the review can be submitted based on form validations.
   */
  canSubmit(): boolean {
    if (this.reviewForm.controls.comment.value === null) {
      return false;
    }

    return this.reviewForm.controls.comment.valid &&
           this.reviewForm.controls.rating.valid &&
           !this.reviewForm.pristine;
  }

  submitReview() {
    const review: Review = {
      id: '0',
      accountId: this.account.id,
      lodgingId: this.lodge.id,
      comment: this.reviewForm.controls.comment.value,
      dateCreated: new Date(Date.now()),
      rating: this.reviewForm.controls.rating.value,
    };

    this.reviewService.post(review).subscribe(_ => {
      this.submitted.emit(true);
    });
  }

  /**
   * Reset the form.
   */
  public reset() {
    this.account = null;
    this.lodge = null;
    this.currentDate = new Date(Date.now());
    this.reviewForm.reset();
    this.reviewForm.markAsPristine();
    Object.keys(this.reviewForm.controls).forEach(key => {
      this.reviewForm.get(key).setErrors(null);
    });
  }

  /**
   * Set the user account who is making the review.
   */
  public setAccount(account: Account): void {
    if (!account) {
      const placeholderAccount: Account = {
        id: '1',
        address: null,
        name: 'Anonymous',
        payments: [],
        profiles: [],
      };
      this.account = placeholderAccount;
    } else {
      this.account = account;
    }
  }

  /**
   * Set the lodge that this review is for.
   */
  public setLodge(lodge: Lodging): void {
    this.lodge = lodge;
  }



}
