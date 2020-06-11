import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingModalComponent } from './booking-modal/booking-modal.component';

const routes: Routes = [{ component: BookingComponent, path: '' }];

@NgModule({
  declarations: [BookingComponent, BookingModalComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
})
export class BookingRoutingModule { }
