import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './views/error/error.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pokedex' },
  {
    path: 'pokedex',
    loadChildren: () => import('./modules/pokedex/pokedex.module').then(m => m.PokedexModule)
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
