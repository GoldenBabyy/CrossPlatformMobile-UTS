import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipleDeletePageRoutingModule } from './multiple-delete-routing.module';

import { MultipleDeletePage } from './multiple-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipleDeletePageRoutingModule
  ],
  declarations: [MultipleDeletePage]
})
export class MultipleDeletePageModule {}
