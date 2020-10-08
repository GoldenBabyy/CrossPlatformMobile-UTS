import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddedFormPageRoutingModule } from './added-form-routing.module';

import { AddedFormPage } from './added-form.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddedFormPageRoutingModule,
  ],
  declarations: [AddedFormPage]
})
export class AddedFormPageModule {}
