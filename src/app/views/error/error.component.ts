import { Component, OnInit } from '@angular/core';

@Component({
  template: `<p>😭</p>`,
  styles: [`
    p {font-size: 10rem; text-align: center;}
  `]
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
