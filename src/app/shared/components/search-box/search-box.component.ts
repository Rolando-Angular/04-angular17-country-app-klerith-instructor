import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();

  /*
    debounceTime -> Emits a notification from the source Observable only after a particular time span has passed without another source emission.
  */

  @ViewChild('txtInput')
  private tagInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();


  public ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(700),
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  public emitValue(tagValue: string): void {
    this.onValue.emit(tagValue)
    this.tagInput.nativeElement.value = '';
  }

  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

}
