import { Injectable } from '@angular/core';

@Injectable()
export class ProductParameterService {
  showImage: boolean = false;
  filterBy: string = '';
  constructor() {}
}
