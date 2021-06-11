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
