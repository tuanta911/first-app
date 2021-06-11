import { map, catchError } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductResolved } from './iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResolved> {
    const id = Number(route.paramMap.get('id'));

    if (isNaN(id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ product: undefined, error: message });
    }

    if (id == 0) {
      return of({
        product: {
          id: 0,
          productName: '',
          productCode: '',
          releaseDate: '',
          price: 0,
          description: '',
          starRating: 0,
          imageUrl: '',
          Category: '',
        },
        error: '',
      });
    }

    return this.productService.getProductById(id).pipe(
      map(
        (product) => ({ product }),
        catchError((error) => {
          const message = `retrieval error: ${error}`;
          console.error(message);
          return of({ product: undefined, error: message });
        })
      )
    );
  }
}
