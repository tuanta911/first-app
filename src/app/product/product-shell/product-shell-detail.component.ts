import { IProduct } from './../iproduct';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
  styleUrls: ['./product-shell-detail.component.css'],
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  sub: Subscription | undefined;
  product: IProduct = {
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

  constructor(private productService: ProductService) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.sub == undefined) {
      this.sub = this.productService.selectedProductSource$.subscribe(
        (selectedProduct) => {
          if (selectedProduct) {
            this.product = selectedProduct;
            console.log(selectedProduct);
          }
        }
      );
    }
  }
}
