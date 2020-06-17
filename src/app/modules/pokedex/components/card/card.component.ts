import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../../model/pokemon';
import {
  isFavorite,
  isSelectedPokemon,
  isShowingFavorites,
  loadPokemonDetails,
  selectPokemonDetails,
  State,
  toggleFavorite,
} from '../../store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @ViewChild('card', { static: true }) card: ElementRef;
  @Input() pokemon: Pokemon;

  renderImg = false;
  loadingImg = true;

  details$: Observable<Pokemon>;
  isSelected$: Observable<boolean>;
  isFavorite$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.initSelectors();
    this.setFocusOnShowFavorites();
  }

  private initSelectors() {
    this.details$ = this.store.select(selectPokemonDetails, { id: this.pokemon.id });
    this.isSelected$ = this.store
      .select(isSelectedPokemon, { id: this.pokemon.id })
      .pipe(tap((s) => this.focusOnSelected(s)));
    this.isFavorite$ = this.store.select(isFavorite, { id: this.pokemon.id });
  }

  private focusOnSelected(isSelected: boolean) {
    if (isSelected) {
      setTimeout(() => this.card.nativeElement.focus(), 0);
    }
  }

  private setFocusOnShowFavorites() {
    this.store
      .select(isShowingFavorites)
      .pipe(
        filter((f) => f === false),
        withLatestFrom(this.isSelected$)
      )
      .subscribe(([_, isSelected]) => this.focusOnSelected(isSelected));
  }

  get spriteSrc(): string {
    return `${environment.spriteApiBaseUrl}/${this.pokemon.name}.gif`;
  }

  select() {
    this.store.dispatch(loadPokemonDetails({ id: this.pokemon.id }));
  }

  toggleFavorite($event: InputEvent) {
    this.store.dispatch(toggleFavorite({ id: this.pokemon.id }));
    $event.stopPropagation();
  }
}
