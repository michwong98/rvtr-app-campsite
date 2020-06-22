import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMessagesComponent } from './control-messages.component';
import { EmailValidator, FormGroup, FormControl } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';

describe('ControlMessagesComponent', () => {
  let component: ControlMessagesComponent;
  let fixture: ComponentFixture<ControlMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have error message when touched', () => {
    component.control = new FormControl();
    component.control.setErrors({'invalidRentals': true});
    component.control.markAsTouched();
    expect(component.errorMessage).not.toBeNull();
  });
  
  it('should not have error message if not touched', () => {
    component.control = new FormControl();
    component.control.setErrors({'invalidRentals': true});
    expect(component.errorMessage).toBeNull();
  });
});
