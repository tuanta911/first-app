import { IProduct, ProductResolved } from './../iproduct';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  private _productService: ProductService;
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
  id: number = 0;
  errorMessage?: string;
  pageTitle: string = 'Detail of Product : ';
  constructor(
    private route: ActivatedRoute,
    productService: ProductService,
    private router: Router
  ) {
    this._productService = productService;
  }

  ngOnInit(): void {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    // this._productService.getProductById(this.id).subscribe({
    //   next: (productData) => {
    //     this.product = productData;
    //   },
    // });

    const resolveData: ProductResolved =
      this.route.snapshot.data['resolveData'];
    this.errorMessage = resolveData.error;
    if (resolveData.product != undefined) {
      this.product = resolveData.product;
      this.pageTitle += this.product.productName;
    } else {
      this.router.navigate(['**']);
    }
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
