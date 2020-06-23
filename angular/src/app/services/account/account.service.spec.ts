import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';
import { AccountService } from './account.service';
import { ConfigService } from '../config/config.service';
import { Account } from '../../data/account.model';
import { Config } from '../../data/config.model';

describe('AccountService', () => {
  const accountMock: Account[] = [
    {
      id: '1',
      address: null,
      name: '',
      payments: null,
      profiles: null,
    },
  ];

  const configServiceStub = {
    get() {
      const config: Config = {
        api: {
          account: {
            base: '',
            uri: {
              account: 'test',
              payment: null,
              profile: null
            }
          },
          booking: null,
          lodging: null,
          monitoring: null,
        },
        navigation: null,
      };

      return scheduled([config], asyncScheduler);
    },
  };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountService);
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

    req = httpTestingController.expectOne('test/0');
    req.flush(JSON.stringify(true));
  }));

  describe('get', () => {

    it('should get all accounts', fakeAsync(() => {
      let req: TestRequest;
      service.get().subscribe((res) => {
        expect(res.length).toEqual(accountMock.length);
      });

      tick();

      req = httpTestingController.expectOne('test');
      req.flush(accountMock);
    }));

    it('should get correct account id', fakeAsync(() => {
      let reqOne: TestRequest;

      service.get('0').subscribe((res) => {
        expect(res[0].id).toEqual(accountMock[0].id);
      });

      tick();

      reqOne = httpTestingController.expectOne('test?id=0');
      reqOne.flush(accountMock);
    }));
  });

  it('should make httpPost request', fakeAsync(() => {
    let req: TestRequest;

    service.post(accountMock[0]).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(JSON.stringify(true));
  }));


  it('should make httpPut request', fakeAsync(() => {
    let req: TestRequest;

    service.put(accountMock[0]).subscribe((res) => {
      expect(res).toEqual(accountMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(accountMock[0]);
  }));
});
