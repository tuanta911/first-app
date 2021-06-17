import { ProductService } from './../product.service';
import { IProduct } from './../iproduct';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductShellDetailComponent } from './product-shell-detail.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.css'],
})
export class ProductShellComponent implements OnInit, OnDestroy {
  monthCount: number = 0;
  sub?: Subscription;
  @ViewChild('productShellDetail') productShellDetail:
    | ProductShellDetailComponent
    | undefined;
  constructor(private productService: ProductService) {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductSource$.subscribe(
      (selectedProduct) => {
        if (selectedProduct) {
          const start = new Date(selectedProduct.releaseDate);
          const now = new Date();
          this.monthCount =
            now.getMonth() -
            start.getMonth() +
            12 * (now.getFullYear() - start.getFullYear());
        }
      }
    );
  }
}
