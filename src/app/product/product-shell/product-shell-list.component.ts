import { ProductListResolved } from './../iproduct';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { IProduct } from '../iproduct';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-shell-list',
  templateUrl: './product-shell-list.component.html',
  styleUrls: ['./product-shell-list.component.css'],
})
export class ProductShellListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  errorMessage: string = '';
  products: IProduct[] = [];
  selectedProduct: IProduct | undefined;
  @ViewChild('productShellList') productShellList: ElementRef | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngAfterViewInit(): void {
    console.log(this.productShellList?.nativeElement);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolveData: ProductListResolved = data['resolveData'];
      this.products =
        resolveData.listProduct == undefined
          ? this.products
          : resolveData.listProduct;
      if (
        this.productService.currentProduct == undefined &&
        this.products.length > 0
      ) {
        this.productService.currentProduct = this.products[0];
      }
      this.selectedProduct = this.productService.currentProduct;

      this.errorMessage = resolveData.error;
    });
  }

  onSelected(product: IProduct): void {
    this.productService.currentProduct = product;
    this.selectedProduct = product;
  }
}
