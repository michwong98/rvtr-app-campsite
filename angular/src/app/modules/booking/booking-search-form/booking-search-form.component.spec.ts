import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSearchFormComponent } from './booking-search-form.component';
import { Lodging } from 'src/app/data/lodging.model';

describe('BookingSearchFormComponent', () => {
  let component: BookingSearchFormComponent;
  let fixture: ComponentFixture<BookingSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSearchFormComponent ]
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
    const retrieveLodgingSpy: any = spyOn(component, 'retreiveLodgingsByPhrase');
    component.onSubmit();
    expect(retrieveLodgingSpy).toHaveBeenCalled();
  });

  it('should not call retrieveLodgingByPhrase on invalid search form', () => {
    const retrieveLodgingSpy: any = spyOn(component, 'retreiveLodgingsByPhrase');
    component.searchForm.controls.guests.setValue(undefined);
    fixture.detectChanges();
    component.onSubmit();
    expect(retrieveLodgingSpy).not.toHaveBeenCalled();
  });
});
