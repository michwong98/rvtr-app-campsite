import { HttpClient, HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { Config } from '../../data/config.model';
import { Review } from 'src/app/data/review.model';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  const reviewMock: Review[] = [
    {
      id: '0',
      accountId: '1',
      lodgingId: '1',
      comment: 'comment',
      dateCreated: new Date(Date.now()),
      rating: 5,
    },
  ];

  const configServiceStub = {
    get() {
      const config: Config = {
        api: {
          account: null,
          booking: null,
          lodging: 'test',
          monitoring: null,
        },
        navigation: null,
      };

      return scheduled([config], asyncScheduler);
    },
  };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make httpDelete request', fakeAsync(() => {
    let req: TestRequest;

    service.delete('0').subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test/Review/0?id=0');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpGet request', fakeAsync(() => {
    let req: TestRequest;
    let reqOne: TestRequest;
    let params = new HttpParams();

    params = params.set('City', 'LA');

    service.get().subscribe((res) => {
      expect(res.length).toEqual(reviewMock.length);
    });

    service.get('0', params).subscribe((res) => {
      expect(res[0]).toEqual(reviewMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test/Review');
    reqOne = httpTestingController.expectOne('test/Review/0?City=LA');

    req.flush(reviewMock);
    reqOne.flush(reviewMock);
  }));

  it('should make httpPost insert request', fakeAsync(() => {
    let req: TestRequest;

    service.post(reviewMock[0]).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test/Review');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpPost update request', fakeAsync(() => {
    let req: TestRequest;

    service.post(reviewMock[0]).subscribe((res) => {
      expect(res).toEqual(reviewMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test/Review');
    req.flush(reviewMock[0]);
  }));
});
