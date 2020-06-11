import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CommonModule } from '@Angular/common';
import { EditAccountComponent } from './edit-account/edit-account.component';

const routes: Routes = [
  { component: AccountComponent, path: ':id' },
  { component : EditAccountComponent, path:'editaccount/:id'}
];

@NgModule({
  declarations: [AccountComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class AccountRoutingModule {}
