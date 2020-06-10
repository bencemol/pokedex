import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../model/pokemon';

export const loadPokemon = createAction(
  '[Pokedex] Load Pokemon'
);

export const loadPokemonOK = createAction(
  '[Pokedex] Pokemon Loaded',
  props<{ pokemon: Pokemon[] }>()
);

export const loadPokemonERROR = createAction(
  '[Pokedex] Pokemon Load Error'
);

export const filterPokemon = createAction(
  '[Pokedex] Filter Pokemon',
  props<{ name: string }>()
);

export const loadPokemonDetails = createAction(
  '[Pokedex] Load Pokemon Details',
  props<{ id: number }>()
);

export const loadPokemonDetailsOK = createAction(
  '[Pokedex] Pokemon Details Loaded',
  props<{ details: Pokemon }>()
);

export const loadPokemonDetailsERROR = createAction(
  '[Pokedex] Pokemon Details Load Error'
);
