import { ProductService } from './../product.service';
import { IProduct } from './../iproduct';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage = '';
  sub!: Subscription;

  private _productService;
  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this.filteredProducts = this.performFilter(value);
    this._listFilter = value;
  }

  products: IProduct[] = [];
  filteredProducts: IProduct[] = this.products;

  constructor(productService: ProductService) {
    this._productService = productService;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this._productService.getProduct().subscribe({
      next: (productData) => {
        this.products = productData;
        this.filteredProducts = productData;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(searchString: string): IProduct[] {
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  onNotify(messange: string, productName: string): void {
    this.pageTitle = productName + ' was click!!!';
  }
}
