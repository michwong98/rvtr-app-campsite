import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { AbstractControl } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';

describe('ValidationService', () => {
  let service: ValidationService;
  let controlFake: Partial<AbstractControl>;
  beforeEach(() => {
    controlFake = {value: 'value'};
    TestBed.configureTestingModule({
      providers: [ValidationService,
        {provide: AbstractControl, useValue: <AbstractControl>controlFake}],
    });
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get validator error message Required', ()=>{
    let message: any = ValidationService.getValidatorErrorMessage('required');
    expect(message).toBe('Required.');
  });

  it('should get validator error message invalidRentals', ()=>{
    let message: any = ValidationService.getValidatorErrorMessage('invalidRentals');
    expect(message).toBe('One rental required.');
  });

  it('should get validator error message invalidGuests', ()=>{
    let message: any = ValidationService.getValidatorErrorMessage('invalidGuests');
    expect(message).toBe('One guest required.');
  });

  it('should get validator error message email', ()=>{
    let message: any = ValidationService.getValidatorErrorMessage('email');
    expect(message).toBe('Invalid email format.');
  });

  it('should return null for rentalsValidator',()=>{
    let result: any = ValidationService.rentalsValidator(<AbstractControl>controlFake);
    expect(result).toBeNull;
  })
  
  it('should return null for guestsValidator',()=>{
    let result: any = ValidationService.guestsValidator(<AbstractControl>controlFake);
    expect(result).toBeNull;
  })

});
