import { NgForm } from '@angular/forms';
import { ProductService } from './../product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductResolved } from '../iproduct';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = 'Edit Product';
  private currentProduct?: IProduct;
  private originalProduct?: IProduct;

  @ViewChild(NgForm) editFrom: NgForm | undefined;

  get product(): IProduct {
    return this.currentProduct == undefined
      ? this.productService.IntProduct()
      : this.currentProduct;
  }

  set product(value: IProduct) {
    this.currentProduct = value;
    this.originalProduct = { ...value };
  }

  get isDirty(): boolean {
    if (this.editFrom == undefined) {
      return false;
    } else {
      return this.editFrom.dirty ? true : false;
    }

    // return (
    //   JSON.stringify(this.originalProduct) !=
    //   JSON.stringify(this.currentProduct)
    // );
  }

  errorMessage?: string;
  private dataIsValid: { [key: string]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolveData: ProductResolved = data['resolveData'];
      this.errorMessage = resolveData.error;
      this.onProductRetrieved(resolveData.product);
      this.product =
        resolveData.product == undefined ? this.product : resolveData.product;
    });
  }

  onProductRetrieved(product: IProduct | undefined): void {
    this.product = product == undefined ? this.product : product;
    if (this.product.id == 0) {
      this.pageTitle = 'Add new Product';
    } else {
      this.pageTitle = 'Edit Product ' + this.product.productName;
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every((d) => this.dataIsValid[d] === true)
    );
  }

  saveProduct(): void {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The new ${this.product.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The updated ${this.product.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else if (this.product.id != undefined) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product.productName} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      //this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  reset(): void {
    this.dataIsValid = {};
    this.currentProduct = undefined;
    this.originalProduct = undefined;
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};
    // 'info' tab
    if (
      this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode
    ) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.product.Category && this.product.Category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
