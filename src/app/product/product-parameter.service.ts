import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IProduct } from './iproduct';

@Injectable()
export class ProductParameterService {
  showImage: boolean = false;
  filterBy: string = '';
  constructor() {}
}
