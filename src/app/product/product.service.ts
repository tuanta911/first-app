import { IProduct } from './iproduct';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productURL = 'api/products';
  private idCounter: number = 11;
  private listProduct: IProduct[] = [];

  constructor(private http: HttpClient) {}

  IntProduct(): IProduct {
    return {
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
  }

  getProduct(): Observable<IProduct[]> {
    if (this.listProduct.length == 0) {
      return this.http.get<IProduct[]>(this.productURL).pipe(
        map((data) => (this.listProduct = data)),
        map((data) =>
          data.sort((obj1, obj2) => {
            if (obj1.productName > obj2.productName) {
              return 1;
            }

            if (obj1.productName < obj2.productName) {
              return -1;
            }

            return 0;
          })
        )
      );
    }
    return of(
      this.listProduct.sort((obj1, obj2) => {
        if (obj1.productName > obj2.productName) {
          return 1;
        }

        if (obj1.productName < obj2.productName) {
          return -1;
        }

        return 0;
      })
    );
  }

  getProductById(id: number): Observable<IProduct | undefined> {
    return this.getProduct().pipe(
      map((product: IProduct[]) => product.find((x) => x.id === id))
    );
  }

  createProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = this.idCounter;
    this.idCounter++;
    return this.http.post<IProduct>(this.productURL, product, { headers }).pipe(
      tap((data) => {
        console.log('createProduct: ' + JSON.stringify(data));
        this.listProduct.push(data);
      }),

      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productURL}/${id}`;
    return this.http.delete<IProduct>(url, { headers }).pipe(
      tap((data) => {
        console.log('deleteProduct: ' + id);
        this.listProduct.forEach((value, index) => {
          if (value.id == id) {
            this.listProduct.splice(index, 1);
          }
        });
      }),
      catchError(this.handleError)
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productURL}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers }).pipe(
      tap((data) => {
        console.log('updateProduct: ' + product.id);
        // this.listProduct.forEach((value, index) => {
        //   if (value.id == product.id) {
        //     this.listProduct.splice(index, 1);
        //     this.listProduct.push(product);
        //   }
        // });
      }),
      // Return the product on an update
      map(() => product),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
