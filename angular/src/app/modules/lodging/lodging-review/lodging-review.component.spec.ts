import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingReviewComponent } from './lodging-review.component';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from 'src/app/data/account.model';

class MockAccountService {
  get(id?: string, params?: HttpParams): Observable<Account[]> {
    return new Observable(sub => {
      sub.next([
        {
          id: '1',
          address: null,
          name: 'Lucy C.',
          payments: [],
          profiles: [],
        },
        {
          id: '2',
          address: null,
          name: 'Lucy C.',
          payments: [],
          profiles: [],
        },
      ]);
    });
  }
}

describe('LodgingReviewComponent', () => {
  let component: LodgingReviewComponent;
  let fixture: ComponentFixture<LodgingReviewComponent>;
  const mockAccountService: MockAccountService = new MockAccountService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgingReviewComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: AccountService, useValue: mockAccountService }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load account info', () => {
    component.review = {
      id: '0',
      accountId: '1',
      lodgingId: '1',
      comment: 'comment',
      dateCreated: new Date(Date.now()),
      rating: 1,
    };
    component.loadAccountInfo();
  });

  it ('should not load account info when empty', () => {
    component.review = {
      id: '0',
      accountId: '1',
      lodgingId: '1',
      comment: 'comment',
      dateCreated: new Date(Date.now()),
      rating: 1,
    };
    spyOn(mockAccountService, 'get').and.returnValue(new Observable(sub => {
      sub.next([]);
    }));
    component.loadAccountInfo();
  });
});
