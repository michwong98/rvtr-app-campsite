import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { Lodging } from 'src/app/data/lodging.model';
import { Address } from 'src/app/data/address.model';
import { Location } from 'src/app/data/location.model';
import { Rental } from 'src/app/data/rental.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { of } from 'rxjs';
import { LayoutModule } from 'src/app/layout/layout.module';
import { Review } from 'src/app/data/review.model';
import { mockLodgings } from '../mock-booking-data';
import { doesNotReject } from 'assert';

describe('BookingComponent', () => {
  // *
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  // * Service Spies
  let getLodgingSpy;

  // * Prep Tests
  beforeEach(async(() => {
    // const lodgingServiceStub = {};

    // * Using instructions from
    // * https://angular.io/guide/testing#testing-with-a-spy
    // Create fake LodgingService with CRUD functions
    const lodgingService = jasmine.createSpyObj('LodgingService', ['get', 'post', 'delete', 'put']);
    // Make the spy return a synchronous Observable with the test data
    getLodgingSpy = lodgingService.get.and.returnValue(of(mockLodgings));

    TestBed.configureTestingModule({
      declarations: [BookingComponent, BookingModalComponent],
      providers: [FormBuilder, { provide: LodgingService, useValue: lodgingService }],
      imports: [HttpClientTestingModule, ReactiveFormsModule, LayoutModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // * Testing
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Guests"', () => {
    const bookingEl: HTMLElement = fixture.nativeElement;

    expect(bookingEl.textContent).toContain('Guest');
  });

  it('should show lodging', () => {
    fixture.detectChanges(); // calls onInit()

    // Spy is synchronous, so result from service is immediate
    expect(getLodgingSpy.calls.any()).toBe(true, 'LodgingService: "get" called');
  });

  it('should create 2D array of lodgings', () => {
    const resultLodgingRow = component.lodgingsRow(mockLodgings, 1);
    const expectedLodginRow: Lodging[][] = [[mockLodgings[0]], [mockLodgings[1]]];

    expect(resultLodgingRow).toEqual(expectedLodginRow);
  });
});
