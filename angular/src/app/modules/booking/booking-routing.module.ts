import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ component: BookingComponent, path: '' }];

@NgModule({
  declarations: [BookingComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
})
export class BookingRoutingModule {}
