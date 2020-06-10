import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { loadPokemonDetails, State } from '../store';

@Injectable({ providedIn: 'root' })
export class PokemonDetailsResolver implements Resolve<Action> {

  constructor(
    private store: Store<State>
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.store.dispatch(loadPokemonDetails({ id: Number(route.params.id) }));
    return of(EMPTY);
  }

}
