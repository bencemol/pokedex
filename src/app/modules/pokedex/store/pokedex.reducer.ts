import { createReducer, on } from '@ngrx/store';
import { Pokemon } from '../model/pokemon';
import * as PokedexActions from './pokedex.actions';

export const pokedexFeatureKey = 'pokedex';

export interface State {
  nameFilter: string;
  pokemon: Pokemon[];
  selected: number;
  details: Pokemon;
  isLoading: boolean;
}

export const initialState: State = {
  nameFilter: '',
  pokemon: [],
  selected: undefined,
  details: undefined,
  isLoading: false
};


export const reducer = createReducer(
  initialState,
  on(PokedexActions.loadPokemon, state =>
    ({ ...state, isLoading: true })),
  on(PokedexActions.loadPokemonOK, (state, props) =>
    ({ ...state, ...props, isLoading: false })),
  on(PokedexActions.loadPokemonERROR, state =>
    ({ ...state, isLoading: false })),
  on(PokedexActions.filterPokemon, (state, props) =>
    ({ ...state, nameFilter: props.name })),
  on(PokedexActions.loadPokemonDetails, (state, props) =>
    ({ ...state, selected: props.id, details: undefined, isLoading: true })),
  on(PokedexActions.loadPokemonDetailsOK, (state, props) =>
    ({ ...state, ...props, isLoading: false })),
  on(PokedexActions.loadPokemonDetailsERROR, state =>
    ({ ...state, isLoading: false }))
);
