import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingModalComponent } from './booking-modal.component';
import { FormGroup, Validators, FormArray, FormBuilder,} from '@angular/forms';
import { HttpClientTestingModule} from '@angular/common/http/testing'
import { element } from 'protractor';

describe('BookingModalComponent', () => {
  let component: BookingModalComponent;
  let fixture: ComponentFixture<BookingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingModalComponent,],
      providers: [FormBuilder,],
      imports: [HttpClientTestingModule,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createGuestItem should return FromGroup', ()=>{
    const guestItem : FormGroup = component.createGuestItem();
    expect(guestItem).toBeInstanceOf(FormGroup);
  });

});
