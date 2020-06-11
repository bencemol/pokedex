import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../../model/pokemon';
import { isFavorite, isSelectedPokemon, loadPokemonDetails, selectPokemonDetails, State, toggleFavorite } from '../../store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  @ViewChild('card', { static: true }) card: ElementRef;
  @Input() pokemon: Pokemon;

  details$: Observable<Pokemon>;
  isSelected$: Observable<boolean>;
  isFavorite$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.details$ = this.store.select(selectPokemonDetails, { id: this.pokemon.id });
    this.isSelected$ = this.store.select(isSelectedPokemon, { id: this.pokemon.id })
      .pipe(
        tap(s => s ? this.card.nativeElement.focus() : null)
      );
    this.isFavorite$ = this.store.select(isFavorite, { id: this.pokemon.id });
  }

  get spriteSrc(): string {
    return `${environment.spriteApiBaseUrl}/${this.pokemon.name}.gif`;
  }

  get hp(): Observable<number> {
    return this.getStat('hp');
  }

  get attack(): Observable<number> {
    return this.getStat('attack');
  }

  get defense(): Observable<number> {
    return this.getStat('defense');
  }

  select() {
    this.store.dispatch(loadPokemonDetails({ id: this.pokemon.id }));
  }

  toggleFavorite($event: InputEvent) {
    this.store.dispatch(toggleFavorite({ id: this.pokemon.id }));
    $event.stopPropagation();
  }

  private getStat(statName: string): Observable<number> {
    return this.details$.pipe(
      map(p => p?.stats.find(s => s.stat.name === statName).base_stat)
    );
  }

}
