import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokedex from './pokedex.reducer';

export const selectPokedexState = createFeatureSelector<fromPokedex.State>(fromPokedex.pokedexFeatureKey);

export const selectPokemon = createSelector(selectPokedexState, (state) =>
  state.pokemon
    .filter((p) => (state.showFavorites && state.favorites.includes(p.id)) || !state.showFavorites)
    .filter((p) => p.name.includes(state.nameFilter))
);

export const isLoading = createSelector(selectPokedexState, (state) => state.isLoading);

export const isSelectedPokemon = createSelector(
  selectPokedexState,
  (state: fromPokedex.State, props: { id: number }) => state.selected === props.id
);

export const selectPokemonDetails = createSelector(
  selectPokedexState,
  (state: fromPokedex.State, props: { id: number }) => (state.details?.id === props.id ? state.details : undefined)
);

export const isFavorite = createSelector(selectPokedexState, (state: fromPokedex.State, props: { id: number }) =>
  state.favorites.includes(props.id)
);

export const isShowingFavorites = createSelector(selectPokedexState, (state) => state.showFavorites);
