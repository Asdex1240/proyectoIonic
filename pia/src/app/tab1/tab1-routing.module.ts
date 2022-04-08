import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'frutas',
    loadChildren: () => import('./frutas/frutas.module').then( m => m.FrutasPageModule)
  },
  {
    path: 'verduras',
    loadChildren: () => import('./verduras/verduras.module').then( m => m.VerdurasPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
