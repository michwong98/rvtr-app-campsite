import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookingsListComponent } from './bookings-list.component';

describe('BookingsListComponent', () => {
  let component: BookingsListComponent;
  let fixture: ComponentFixture<BookingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsListComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
