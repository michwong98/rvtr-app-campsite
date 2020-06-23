import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../../../data/review.model';
import { AccountService } from '../../../services/account/account.service';
import { Account } from '../../../data/account.model';

@Component({
  selector: 'uic-lodging-review',
  templateUrl: './lodging-review.component.html'
})
export class LodgingReviewComponent implements OnInit {

  accountInfo: Account;
  @Input() review: Review;
  @Input() displayComment = false;

  constructor(private readonly accountService: AccountService) { }

  ngOnInit(): void {
  }

  loadAccountInfo(): void {
    this.accountService.get(this.review.accountId).subscribe(response => {
      if (response.length > 0) {
        this.accountInfo = response[0];
      }
    });
  }
}
