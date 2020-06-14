import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { PokedexService } from '../services/pokedex.service';
import * as PokedexActions from './pokedex.actions';
import { pokedexFeatureKey, State } from './pokedex.reducer';
import { selectPokedexState } from './pokedex.selectors';

@Injectable()
export class PokedexEffects implements OnInitEffects {
  constructor(private actions$: Actions, private store: Store<State>, private pokedexService: PokedexService) {}

  ngrxOnInitEffects() {
    return PokedexActions.initPokemon();
  }

  loadPokemon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokedexActions.loadPokemon),
      mergeMap(() =>
        this.pokedexService.getPokemon().pipe(
          map((res) => PokedexActions.loadPokemonOK({ pokemon: res })),
          catchError(() => of(PokedexActions.loadPokemonERROR()))
        )
      )
    );
  });

  loadPokemonDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokedexActions.loadPokemonDetails),
      mergeMap((props) =>
        this.pokedexService.getPokemonDetails(props.id).pipe(
          map((res) => PokedexActions.loadPokemonDetailsOK({ details: res })),
          catchError(() => of(PokedexActions.loadPokemonDetailsERROR()))
        )
      )
    );
  });

  initState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokedexActions.initPokemon),
      map(() => PokedexActions.hydrateState({ state: JSON.parse(window.localStorage.getItem(pokedexFeatureKey)) }))
    );
  });

  toggleFavorite$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PokedexActions.toggleFavorite),
        withLatestFrom(this.store.select(selectPokedexState)),
        tap(([_, { favorites }]) => window.localStorage.setItem(pokedexFeatureKey, JSON.stringify({ favorites })))
      );
    },
    { dispatch: false }
  );
}
