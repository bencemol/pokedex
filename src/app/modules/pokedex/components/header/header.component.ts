import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { filterPokemon, State } from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchInputControl = new FormControl();
  sub = new Subscription();

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.sub.add(
      this.searchInputControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(
        val => this.store.dispatch(filterPokemon({ name: val }))
      ));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
