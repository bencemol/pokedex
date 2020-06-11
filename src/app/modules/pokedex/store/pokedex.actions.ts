import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../model/pokemon';
import { State } from './pokedex.reducer';

export const initPokemon = createAction(
  '[Pokedex] Init'
);

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

export const toggleFavorite = createAction(
  '[Pokedex] Toggle Favorite',
  props<{ id: number }>()
);

export const hydrateState = createAction(
  '[Pokedex] Hydrate State',
  props<{ state: State }>()
);

export const toggleShowFavorites = createAction(
  '[Pokedex] Toggle Show Favorite'
);
