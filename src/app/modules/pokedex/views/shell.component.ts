import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
