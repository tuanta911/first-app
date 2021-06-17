import { IProduct } from './../iproduct';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
  styleUrls: ['./product-shell-detail.component.css'],
})
export class ProductShellDetailComponent implements OnInit {
  errorMessage: string = '';
  private _product: IProduct = {
    id: 0,
    productName: '',
    productCode: '',
    releaseDate: '',
    price: 0,
    description: '',
    starRating: 0,
    imageUrl: '',
    Category: '',
  };

  get product(): IProduct {
    if (this.productService.currentProduct != undefined) {
      return this.productService.currentProduct;
    }
    return this._product;
  }
  set product(value: IProduct) {
    this._product = value;
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
}
