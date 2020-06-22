import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSearchFormComponent } from './booking-search-form.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Lodging } from 'src/app/data/lodging.model';

describe('BookingSearchFormComponent', () => {
  let component: BookingSearchFormComponent;
  let fixture: ComponentFixture<BookingSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingSearchFormComponent],
      providers: [FormBuilder, LodgingService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrive lodging by phrase', () => {
    component.retreiveLodgingsByPhrase('');
    component.lodgings$.subscribe((lodgings: Lodging[]) => {
      expect(lodgings.length).toBe(2);
    });
    component.retreiveLodgingsByPhrase('Los Angeles');
    component.lodgings$.subscribe((lodgings: Lodging[]) => {
      expect(lodgings.length).toBe(1);
    });
  });

  it('should submit', () => {
    component.searchForm = new FormGroup({
      location: new FormControl(''),
      checkIn: new FormControl(''),
      checkOut: new FormControl(''),
      guests: new FormControl(1)
    });
    const retrieveLodgingSpy: any = spyOn(component, 'retreiveLodgingsByPhrase');
    component.onSubmit();
    expect(retrieveLodgingSpy).toHaveBeenCalled();
  });

  it('should not call retrieveLodgingByPhrase on invalid search form', () => {
    const retrieveLodgingSpy: any = spyOn(component, 'retreiveLodgingsByPhrase');
    component.searchForm = new FormGroup({
      location: new FormControl(''),
      checkIn: new FormControl(''),
      checkOut: new FormControl(''),
      guests: new FormControl(null, Validators.required)
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(retrieveLodgingSpy).not.toHaveBeenCalled();
  });
});
