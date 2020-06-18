import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSearchFormComponent } from './booking-search-form.component';
import { FormBuilder } from '@angular/forms';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookingSearchFormComponent', () => {
  let component: BookingSearchFormComponent;
  let fixture: ComponentFixture<BookingSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSearchFormComponent ],
      providers: [ FormBuilder, LodgingService],
      imports: [HttpClientTestingModule],
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
});
