import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddedFormPage } from './added-form.page';

const routes: Routes = [
  {
    path: '',
    component: AddedFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddedFormPageRoutingModule {}
