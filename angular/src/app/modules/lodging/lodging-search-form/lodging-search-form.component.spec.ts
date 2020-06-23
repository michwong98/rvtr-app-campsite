import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LodgingSearchFormComponent } from './lodging-search-form.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LodgingSortKey } from '../@types/lodging-sort-key';
import { SortOrder } from '../@types/sort-order';

describe('LodgingSearchFormComponent', () => {

  let component: LodgingSearchFormComponent;
  let fixture: ComponentFixture<LodgingSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LodgingSearchFormComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    expect(component.onSubmit()).toBeUndefined();
  });

  it('should generate query params', () => {
    component.searchForm = new FormGroup({
      city: new FormControl('city'),
      name: new FormControl('name'),
      beds: new FormControl('1'),
      baths: new FormControl('1'),
      rating: new FormControl('1'),
      sortBy: new FormControl(LodgingSortKey.ReviewAverageRating),
      orderBy: new FormControl(SortOrder.Descending),
    });
    expect(component.generateQueryParams()).toBeTruthy();
  });
});
