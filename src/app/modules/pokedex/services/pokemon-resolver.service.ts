import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { loadPokemonERROR, loadPokemonOK, State, loadPokemon } from '../store';

@Injectable({ providedIn: 'root' })
export class PokemonResolver implements Resolve<Action> {
  constructor(private router: Router, private store: Store<State>, private action$: Actions) {}

  resolve(): Observable<Action> {
    this.store.dispatch(loadPokemon());
    const responseOK = this.action$.pipe(ofType(loadPokemonOK));
    const responseFAIL = this.action$.pipe(
      ofType(loadPokemonERROR),
      tap(() => this.router.navigate(['/error']))
    );
    return race(responseOK, responseFAIL).pipe(take(1));
  }
}
