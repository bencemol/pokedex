import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PokedexService } from '../services/pokedex.service';
import * as PokedexActions from './pokedex.actions';
import { of } from 'rxjs';


@Injectable()
export class PokedexEffects {

  constructor(
    private actions$: Actions,
    private pokedexService: PokedexService
  ) { }

  loadPokemon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokedexActions.loadPokemon),
      mergeMap(() => this.pokedexService.getPokemon()
        .pipe(
          map(res => PokedexActions.loadPokemonOK({ pokemon: res })),
          catchError(() => of(PokedexActions.loadPokemonERROR()))
        ))
    );
  });

  loadPokemonDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokedexActions.loadPokemonDetails),
      mergeMap(props => this.pokedexService.getPokemonDetails(props.id)
        .pipe(
          map(res => PokedexActions.loadPokemonDetailsOK({ details: res })),
          catchError(() => of(PokedexActions.loadPokemonDetailsERROR()))
        ))
    );
  });

}
