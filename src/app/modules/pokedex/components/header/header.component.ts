import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { filterPokemon, State, toggleShowFavorites, isShowingFavorites } from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchInputControl = new FormControl();
  showFavoritesControl = new FormControl();
  sub = new Subscription();

  isShowingFavorites$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.sub.add(
      this.searchInputControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(
        val => this.store.dispatch(filterPokemon({ name: val }))
      ));
    this.sub.add(
      this.showFavoritesControl.valueChanges.subscribe(
        () => this.store.dispatch(toggleShowFavorites())
      ));
    this.isShowingFavorites$ = this.store.select(isShowingFavorites);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
