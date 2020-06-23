import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { LodgingAddReviewComponent } from './lodging-add-review.component';
import { ReviewService } from 'src/app/services/lodging/review.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from 'src/app/data/review.model';

class MockReviewService {
  get(id?: string, params?: HttpParams): Observable<Review[]> {
    return new Observable(sub => {
      sub.next([]);
    });
  }

  post(review: Review): Observable<Review> {
    return new Observable(sub => {
      sub.next(null);
    });
  }
}

describe('LodgingAddReviewComponent', () => {
  let component: LodgingAddReviewComponent;
  let fixture: ComponentFixture<LodgingAddReviewComponent>;
  const mockReviewService: MockReviewService = new MockReviewService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgingAddReviewComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ReviewService, useValue: mockReviewService }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingAddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit review', () => {
    fixture.detectChanges();
    component.ngOnInit();

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

    component.account = account;
    component.lodge = lodge;

    component.reviewForm.controls.comment.setValue('test comment');
    component.reviewForm.controls.rating.setValue(1);

    spyOn(component.submitted, 'emit');

    component.submitReview();
    fixture.detectChanges();

    expect(component.submitted.emit).toHaveBeenCalledWith(true);
  });

  it('should reset review form', () => {
    fixture.detectChanges();
    component.ngOnInit();

    component.reviewForm.controls.comment.setValue('test');
    expect(component.reviewForm.controls.comment.value).toEqual('test');

    component.reset();
    fixture.detectChanges();
    expect(component.reviewForm.controls.comment.value).toEqual(null);
  });

  it('should set account', () => {
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.account).toEqual(undefined);

    const account = {
      id: '1',
      address: null,
      name: 'Lucy C.',
      payments: [],
      profiles: [],
    };

    component.setAccount(account);
    expect(component.account).not.toEqual(undefined);
    expect(component.account.id).toEqual('1');
  });

  it('should set default account', () => {
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.account).toEqual(undefined);

    component.setAccount(null);
    expect(component.account.id).toEqual('1');
    expect(component.account.name).toEqual('Anonymous');
  });

  it('should set lodging', () => {
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.lodge).toEqual(undefined);

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

    component.setLodge(lodge);
    expect(component.lodge.id).toEqual('1');
  });

});
