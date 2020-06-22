import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';

import { BookingComponent } from './booking/booking.component';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { BookingSearchFormComponent } from './booking-search-form/booking-search-form.component';
import { LodgingsListComponent } from './lodgings-list/lodgings-list.component';
import { BookingsListComponent } from './bookings-list/bookings-list.component';

const routes: Routes = [{ component: BookingComponent, path: '' }];

@NgModule({
  declarations: [BookingComponent, BookingModalComponent, BookingSearchFormComponent, LodgingsListComponent, BookingsListComponent],
  exports: [RouterModule, BookingComponent, BookingModalComponent, BookingSearchFormComponent, LodgingsListComponent, BookingsListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    LayoutModule
  ],
})
export class BookingRoutingModule { }
