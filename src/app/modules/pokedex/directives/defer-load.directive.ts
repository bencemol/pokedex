import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[deferLoad]',
})
export class DeferLoadDirective implements AfterViewInit, OnDestroy {
  @Output() deferLoad: EventEmitter<any> = new EventEmitter();
  @Output() unLoad: EventEmitter<any> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;

  constructor(private _element: ElementRef) {}

  ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, {});
    this.intersectionObserver.observe(<Element>this._element.nativeElement);
  }

  ngOnDestroy() {
    this.tearDown();
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.deferLoad.emit();
      } else {
        this.unLoad.emit();
      }
    });
  };

  private tearDown() {
    this.intersectionObserver.unobserve(<Element>this._element.nativeElement);
    this.intersectionObserver.disconnect();
  }

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return entry.isIntersecting && entry.target === this._element.nativeElement;
  }
}
