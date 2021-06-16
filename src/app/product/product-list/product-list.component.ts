import { ProductParameterService } from './../product-parameter.service';
import { CriteriaComponent } from './../../shared/criteria/criteria.component';
import { IProduct, ProductListResolved } from './../iproduct';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage = '';
  includeDetail: boolean = true;
  sub!: Subscription; // hold the supcription, using to check is we subcribe element or not, if yes don't supcribe again
  @ViewChild('filterCriteria') filterCriteria: CriteriaComponent | undefined;

  products: IProduct[] = [];
  filteredProducts: IProduct[] = this.products;

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  constructor(
    private route: ActivatedRoute,
    private productParameterService: ProductParameterService
  ) {}

  ngAfterViewInit(): void {
    if (this.filterCriteria != undefined) {
      this.filterCriteria.listFilter = this.productParameterService.filterBy;
    }
  }

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

  onSearchValueChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.filteredProducts = this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
    this.productParameterService.showImage = this.showImage;
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
