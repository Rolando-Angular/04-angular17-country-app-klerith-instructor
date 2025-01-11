import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  /*
    ngOnDestroy -> It's called just before a component or directive is destroyed by Angular
    debounceTime -> Emits a notification from the source Observable only after a particular time span has passed without another source emission.
  */

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();


  public ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(700),
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  public ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
    console.log('onKyePress has been done')
  }

}
