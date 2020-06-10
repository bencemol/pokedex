import { Routes, RouterModule } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { NgModule } from '@angular/core';
import { PokemonResolver } from './services/pokemon-resolver.service';
import { ShellComponent } from './views/shell.component';
import { PokemonDetailsResolver } from './services/pokemon-details-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: PokedexComponent,
        resolve: {
          pokemon: PokemonResolver
        },
        children: [
          {
            path: ':id',
            component: PokedexComponent,
            resolve: {
              pokemon: PokemonDetailsResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule { }
