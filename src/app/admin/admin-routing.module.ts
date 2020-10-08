import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'added-form',
    loadChildren: () => import('./form/added-form/added-form.module').then( m => m.AddedFormPageModule)
  },
  {
    path: 'edit-form/:itemId',
    loadChildren: () => import('./form/edit-form/edit-form.module').then( m => m.EditFormPageModule)
  },  
  {
    path: 'home/:itemId',
    loadChildren: () => import('../home/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'multiple-delete',
    loadChildren: () => import('./form/multiple-delete/multiple-delete.module').then( m => m.MultipleDeletePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
