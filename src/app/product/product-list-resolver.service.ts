import { ProductListResolved } from './iproduct';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductListResolverService
  implements Resolve<ProductListResolved>
{
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | ProductListResolved
    | Observable<ProductListResolved>
    | Promise<ProductListResolved> {
    return this.productService.getProduct().pipe(
      map(
        (listProduct) => ({ listProduct }),
        catchError((error) => {
          const message = `retrieval error: ${error}`;
          console.error(message);
          return of({ listProduct: undefined, error: message });
        })
      )
    );
  }
}
