import { IProduct } from './../../iproduct';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResolved } from '../../iproduct';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit-info',
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.css'],
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productForm?: NgForm;
  product: IProduct = {
    productId: 0,
    productName: '',
    productCode: '',
    releaseDate: '',
    price: 0,
    description: '',
    starRating: 0,
    imageUrl: '',
    Category: '',
  };
  errorMessage?: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      if (this.productForm) {
        this.productForm.reset();
      }

      this.product = data['resolveData'].product;
    });
  }
}
