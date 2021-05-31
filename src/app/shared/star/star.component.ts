import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit, OnChanges {
  @Input() rating = 0;
  cropWidth = 75;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnChanges(): void {
    this.cropWidth = (this.rating * 75) / 5;
  }

  ngOnInit(): void {}

  onClickDiv(): void {
    this.notify.emit('click!');
  }
}
