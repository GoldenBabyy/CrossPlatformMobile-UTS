import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleDeletePage } from './multiple-delete.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleDeletePageRoutingModule {}
