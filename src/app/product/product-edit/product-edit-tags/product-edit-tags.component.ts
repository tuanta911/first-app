import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../iproduct';

@Component({
  selector: 'app-product-edit-tags',
  templateUrl: './product-edit-tags.component.html',
  styleUrls: ['./product-edit-tags.component.css'],
})
export class ProductEditTagsComponent implements OnInit {
  errorMessage?: string;
  newTags = '';
  product: IProduct = {
    productId: 0,
    productName: 'test',
    productCode: '',
    releaseDate: '',
    price: 0,
    description: '',
    starRating: 0,
    imageUrl: '',
    Category: '',
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      this.product = data['resolveData'].product;
    });
  }

  addTags(): void {
    if (!this.newTags) {
      this.errorMessage =
        'Enter the search keywords separated by commas and then press Add';
    } else {
      const tagArray = this.newTags.split(',');
      this.product.tags = this.product.tags
        ? this.product.tags.concat(tagArray)
        : tagArray;
      this.newTags = '';
      this.errorMessage = '';
    }
  }

  removeTag(idx: number) {
    this.product.tags?.splice(idx, 1);
  }
}
