import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LodgingComponent } from './lodging.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { LodgingQueryParams } from '../@types/lodging-query-params';
import { of, empty } from 'rxjs';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { Account } from 'src/app/data/account.model';
import { AccountService } from 'src/app/services/account/account.service';

describe('LodgingComponent', () => {
  let component: LodgingComponent;
  let fixture: ComponentFixture<LodgingComponent>;

  const lodgingServiceMock = {
    get() {
      const lodges: Lodging[] = [{
        id: '0',
        location: {
          id: '1',
          address: {
            id: '1',
            city: 'city',
            country: 'country',
            postalCode: 'postal code',
            stateProvince: 'state',
            street: 'street',
            unit: '',
          },
          latitude: 0,
          longitude: 1,
          locale: 'locale',
        },
        name: 'name',
        description: 'description',
        rentals: null,
        reviews: null,
        amenities: null,
        images: [
          { id: '1', image: 'image1' },
          { id: '2', image: 'image2' },
          { id: '3', image: 'image3' },
          { id: '4', image: 'image4' },
          { id: '5', image: 'image5' },
          { id: '6', image: 'image6' },
          { id: '7', image: 'image7' },
        ]
      }];
      return of( lodges );
    }
  };

  const accountServiceMock = {
    get() {
      const accounts: Account[] = [{
        id: '1',
        address: {
          id: '1',
          city: 'Dallas',
          country: 'US',
          postalCode: '77777',
          stateProvince: 'Texas',
          street: '123 Testing st.',
          unit: '',
        },
        name: 'Lucy C.',
        payments: [],
        profiles: [],
      }];
      return of( accounts );
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LodgingComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: LodgingService, useValue: lodgingServiceMock },
                  {provide: AccountService, useValue: accountServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run search submit', () => {
    expect(component.searchParams === new HttpParams());

    const sampleParams = new HttpParams();
    sampleParams.set('test', 'test');

    component.onSearchSubmit(sampleParams);

    expect(component.searchParams.get('test') === 'test');
  });

  it('should load lodgings', () => {
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.lodgings.length).toEqual(2);
  });

  it('should get icon name from amenity', () => {
    expect(component.getIconName('Pool')).toEqual('swimmer');
    expect(component.getIconName('Coffee')).toEqual('coffee');
  });


  it('should go forward a page and fetch more entries', () => {
    component.lodgingCache.push(null);
    component.currentPageIndex = 0;
    component.pageSize = 1;
    component.allLodgesLoaded = false;

    component.nextPage();

    expect(component.currentPageIndex).toEqual(1);
  });

  it('should go forward a page and use cache entries', () => {
    component.lodgingCache.push(null, null, null, null, null, null, null);
    component.currentPageIndex = 0;
    component.pageSize = 1;

    component.nextPage();

    expect(component.currentPageIndex).toEqual(1);
  });

  it('should mark last page index', () => {
    component.currentPageIndex = 0;
    component.pageSize = 1;

    component.processLodgeResponse([]);
    expect(component.allLodgesLoaded).toBeTrue();
  });

  it('should go back a page', () => {
    component.currentPageIndex = 1;
    component.pageSize = 1;
    component.previousPage();

    expect(component.currentPageIndex).toEqual(0);
  });

  it('should scroll to the top', () => {
    component.pageViewToFirstResult();
  });

  it('should sort reviews', () => {
    const lodgeWithReviews: Lodging[] = [{
      id: '0',
      location: {
        id: '1',
        address: null,
        latitude: 0,
        longitude: 1,
        locale: 'locale',
      },
      name: 'name',
      description: 'description',
      rentals: null,
      reviews: [
        {
          id: '0',
          accountId: '1',
          lodgingId: '1',
          comment: 'comment',
          dateCreated: new Date(Date.now()),
          rating: 1,
        },
        {
          id: '1',
          accountId: '1',
          lodgingId: '1',
          comment: 'comment',
          dateCreated: new Date(Date.now()),
          rating: 1,
        }
      ],
      amenities: null,
      images: null,
    }];
    component.processLodgeResponse(lodgeWithReviews);
  });

  it('should load mock account', () => {
    spyOn(accountServiceMock, 'get').and.returnValue(of([]));

    component.ngOnInit();
    expect(component.lodgings.length).toEqual(2);
  });

  it('should do nothing on prefetch if next pages already loaded', () => {
    component.lodgingCache.push(null);
    component.currentPageIndex = 0;
    component.pageSize = 1;
    component.allLodgesLoaded = true;

    component.nextPage();

    expect(component.currentPageIndex).toEqual(1);
  });
});
