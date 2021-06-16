import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css'],
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  hitMessage: string = '';

  @ViewChild('filterElement') filterElementRef: ElementRef | undefined;
  @Input() displayDetail: boolean = true;
  @Input() hitCount: number = 0;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matchs found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
  }

  ngAfterViewInit(): void {
    this.filterElementRef?.nativeElement.focus();
  }

  ngOnInit(): void {}
}
