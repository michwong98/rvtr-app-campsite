import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingReviewModalComponent } from './lodging-review-modal.component';
import { LodgingReviewListComponent } from '../lodging-review-list/lodging-review-list.component';
import { Review } from 'src/app/data/review.model';
import { of } from 'rxjs';
import { ReviewService } from 'src/app/services/lodging/review.service';
import { LodgingAddReviewComponent } from '../lodging-add-review/lodging-add-review.component';

const reviewServiceMock = {
  get() {
    const reviews: Review[] = [{
      id: '0',
      accountId: '1',
      lodgingId: '1',
      comment: 'comment',
      dateCreated: new Date(Date.now()),
      rating: 1,
    }];
    return of( reviews );
  }
};

describe('LodgingReviewModalComponent', () => {
  let component: LodgingReviewModalComponent;
  let fixture: ComponentFixture<LodgingReviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LodgingReviewModalComponent,
        LodgingReviewListComponent,
        LodgingAddReviewComponent
      ],
      providers: [{ provide: ReviewService, useValue: reviewServiceMock }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fired review submitted event callback', () => {
    component.reviewSubmitted();
  });

  it('should open and close modal', () => {
    const account = {
      id: '1',
      address: null,
      name: 'Lucy C.',
      payments: [],
      profiles: [],
    };

    const lodge = {
        id: '1',
        location: null,
        name: 'name',
        description: 'description',
        rentals: null,
        reviews: null,
        amenities: null,
        images: null,
    };

    component.openModal(null, lodge, account);
    expect(component.lodgingReviewModal.nativeElement.classList).toContain('is-active');

    component.closeModal(null);
    expect(component.lodgingReviewModal.nativeElement.classList).not.toContain('is-active');

    component.openModal(new MouseEvent('click'), lodge, account);
    expect(component.lodgingReviewModal.nativeElement.classList).toContain('is-active');

    component.closeModal(new MouseEvent('click'));
    expect(component.lodgingReviewModal.nativeElement.classList).not.toContain('is-active');
  });

  it('should not reset anything when opening modal', () => {
    const account = {
      id: '1',
      address: null,
      name: 'Lucy C.',
      payments: [],
      profiles: [],
    };

    const lodge = {
        id: '1',
        location: null,
        name: 'name',
        description: 'description',
        rentals: null,
        reviews: null,
        amenities: null,
        images: null,
    };

    component.lodgingReviewList = null;
    component.lodgingAddReviewComponent = null;

    component.openModal(null, lodge, account);
    expect(component.lodgingReviewModal.nativeElement.classList).toContain('is-active');

  });
});
