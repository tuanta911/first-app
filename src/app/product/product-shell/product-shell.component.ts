import { IProduct } from './../iproduct';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductShellDetailComponent } from './product-shell-detail.component';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.css'],
})
export class ProductShellComponent implements OnInit {
  monthCount: number = 0;
  @ViewChild('productShellDetail') productShellDetail:
    | ProductShellDetailComponent
    | undefined;
  constructor() {}

  ngOnInit(): void {}
}
