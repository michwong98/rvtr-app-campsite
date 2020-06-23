import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LodgingComponent } from './lodging/lodging.component';

const routes: Routes = [{ component: LodgingComponent, path: '' }];


@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LodgingRoutingModule { }
