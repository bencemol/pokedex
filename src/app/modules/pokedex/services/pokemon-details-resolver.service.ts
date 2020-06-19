import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { loadPokemonDetails, State } from '../store';

@Injectable({ providedIn: 'root' })
export class PokemonDetailsResolver implements Resolve<Action> {
  constructor(private store: Store<State>, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = Number(route.params.id);
    if (id) {
      this.store.dispatch(loadPokemonDetails({ id }));
    } else {
      this.router.navigate(['/']);
    }
    return of(EMPTY);
  }
}
