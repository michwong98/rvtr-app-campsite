import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingReviewListComponent } from './lodging-review-list.component';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { ReviewService } from 'src/app/services/lodging/review.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from 'src/app/data/review.model';

class MockReviewService {
  get(id?: string, params?: HttpParams): Observable<Review[]> {
    return new Observable(sub => {
      sub.next([
        {
          id: '1',
          accountId: '1',
          lodgingId: '1',
          comment: 'comment',
          dateCreated: new Date(Date.now()),
          rating: 1,
        },
        {
          id: '2',
          accountId: '1',
          lodgingId: '1',
          comment: 'comment',
          dateCreated: new Date(Date.now()),
          rating: 1,
        },
        {
          id: '3',
          accountId: '1',
          lodgingId: '1',
          comment: 'comment',
          dateCreated: new Date(Date.now()),
          rating: 1,
        },
        {
          id: '4',
          accountId: '1',
          lodgingId: '1',
          comment: 'comment',
          dateCreated: new Date(Date.now()),
          rating: 1,
        },
        {
          id: '5',
          accountId: '1',
          lodgingId: '1',
          comment: 'comment',
          dateCreated: new Date(Date.now()),
          rating: 1,
        },
      ]);
    });
  }
}

describe('LodgingReviewListComponent', () => {
  let component: LodgingReviewListComponent;
  let fixture: ComponentFixture<LodgingReviewListComponent>;
  const mockReviewService: MockReviewService = new MockReviewService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgingReviewListComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ReviewService, useValue: mockReviewService }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more reviews', () => {
    component.limit = 1;
    expect(component.reviews.length).toEqual(0);

    component.loadReviews();

    expect(component.reviews.length).toBeGreaterThan(0);

    expect(component.offset).toEqual(1);
  });

  it('should mark all reviews loaded', () => {
    component.limit = 10;
    expect(component.reviews.length).toEqual(0);

    component.loadReviews();

    expect(component.allReviewsLoaded).toBeTrue();
  });

  it('should reset review list', () => {
    component.limit = 10;
    expect(component.reviews.length).toEqual(0);

    component.loadReviews();
    expect(component.allReviewsLoaded).toBeTrue();

    expect(component.reviews.length).toBeGreaterThan(0);

    component.reset();
    expect(component.reviews.length).toEqual(0);
    expect(component.offset).toEqual(0);
    expect(component.allReviewsLoaded).toBeFalse();
    expect(component.lodgeId).toEqual(0);
  });

  it('should set lodge id', () => {
    expect(component.lodgeId).toEqual(0);

    component.setLodgeId(1);

    expect(component.lodgeId).toEqual(1);

  });
});
