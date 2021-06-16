import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css'],
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  listFilter: string = '';
  hitMessage: string = '';

  @ViewChild('filterElement') filterElementRef: ElementRef | undefined;
  @Input() displayDetail: boolean = true;
  @Input() hitCount: number = 0;

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
