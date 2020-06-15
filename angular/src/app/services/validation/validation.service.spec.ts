import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { AbstractControl } from '@angular/forms';

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

});
