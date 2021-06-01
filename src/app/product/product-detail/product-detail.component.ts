import { IProduct } from './../iproduct';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  private _productService: ProductService;
  product: IProduct | undefined;
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    productService: ProductService,
    private router: Router
  ) {
    this._productService = productService;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this._productService.getProductById(this.id).subscribe({
      next: (productData) => {
        this.product = productData;
        console.log(productData);
      },
    });
    console.log(this.route.snapshot.paramMap.get('id'));
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
