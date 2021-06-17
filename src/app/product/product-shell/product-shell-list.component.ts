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
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { IProduct } from '../iproduct';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-shell-list',
  templateUrl: './product-shell-list.component.html',
  styleUrls: ['./product-shell-list.component.css'],
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  errorMessage: string = '';
  products: IProduct[] = [];
  selectedProduct: IProduct | undefined;
  @ViewChild('productShellList') productShellList: ElementRef | undefined;
  sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolveData: ProductListResolved = data['resolveData'];
      this.products =
        resolveData.listProduct == undefined
          ? this.products
          : resolveData.listProduct;
      this.errorMessage = resolveData.error;
    });
    if (!this.sub) {
      this.sub = this.productService.selectedProductSource$.subscribe(
        (selectedProduct) => {
          (this.selectedProduct = selectedProduct),
            console.log(selectedProduct);
        }
      );
    }
  }

  onSelected(product: IProduct): void {
    this.productService.changeSelectedProduct(product);
    this.selectedProduct = product;
  }
}
