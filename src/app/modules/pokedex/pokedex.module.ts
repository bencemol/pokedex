import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { pokedexFeatureKey, reducer } from './store';
import { PokedexEffects } from './store/pokedex.effects';
import { ShellComponent } from './views/shell.component';



@NgModule({
  declarations: [
    ShellComponent,
    PokedexComponent,
    HeaderComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PokedexRoutingModule,
    EffectsModule.forFeature([PokedexEffects]),
    StoreModule.forFeature(pokedexFeatureKey, reducer)
  ]
})
export class PokedexModule { }
