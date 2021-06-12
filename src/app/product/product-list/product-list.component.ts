import { IProduct, ProductListResolved } from './../iproduct';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage = '';
  sub!: Subscription;

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolveData: ProductListResolved = data['resolveData'];
      this.products =
        resolveData.listProduct == undefined
          ? this.products
          : resolveData.listProduct;
      this.filteredProducts =
        resolveData.listProduct == undefined
          ? this.products
          : resolveData.listProduct;
      this.errorMessage = resolveData.error;
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
