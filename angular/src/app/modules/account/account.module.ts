import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { EditAccountComponent } from './edit-account/edit-account.component';


@NgModule({
  declarations: [EditAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
  ]
})
export class AccountModule { }
