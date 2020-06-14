import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, loadPokemon, selectPokemon } from '../../store';
import { Observable } from 'rxjs';
import { Pokemon } from '../../model/pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexComponent implements OnInit {
  pokemon$: Observable<Pokemon[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.pokemon$ = this.store.select(selectPokemon);
  }
}
