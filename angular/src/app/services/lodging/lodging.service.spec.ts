import { HttpClient, HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';
import { LodgingService } from './lodging.service';
import { ConfigService } from '../config/config.service';
import { Config } from '../../data/config.model';
import { Lodging } from '../../data/lodging.model';
import { FormControl } from '@angular/forms';

describe('LodgingService', () => {
  const lodgingMock: Lodging[] = [
    {
      id: '0',
      location: null,
      name: null,
      description: null,
      amenities: [],
      images: [],
      rentals: [],
      reviews: []
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
  let service: LodgingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LodgingService);
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

    req = httpTestingController.expectOne('test/Lodging/0?id=0');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpGet request', fakeAsync(() => {
    let req: TestRequest;
    let reqOne: TestRequest;
    let params = new HttpParams();

    params = params.set('City', 'LA');

    service.get().subscribe((res) => {
      expect(res.length).toEqual(lodgingMock.length);
    });

    service.get('0', params).subscribe((res) => {
      expect(res[0]).toEqual(lodgingMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test/Lodging');
    reqOne = httpTestingController.expectOne('test/Lodging/0?City=LA');

    req.flush(lodgingMock);
    reqOne.flush(lodgingMock);
  }));

  it('should make httpPost insert request', fakeAsync(() => {
    let req: TestRequest;

    service.post(lodgingMock[0]).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test/Lodging');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpPost update request', fakeAsync(() => {
    let req: TestRequest;

    service.post(lodgingMock[0]).subscribe((res) => {
      expect(res).toEqual(lodgingMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test/Lodging');
    req.flush(lodgingMock[0]);
  }));
});
