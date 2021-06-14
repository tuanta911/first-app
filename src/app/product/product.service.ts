import { IProduct } from './iproduct';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productURL = 'api/products';
  private idCounter: number = 11;

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
    return this.http.get<IProduct[]>(this.productURL);
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
      tap((data) => console.log('createProduct: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productURL}/${id}`;
    return this.http.delete<IProduct>(url, { headers }).pipe(
      tap((data) => console.log('deleteProduct: ' + id)),
      catchError(this.handleError)
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productURL}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers }).pipe(
      tap(() => console.log('updateProduct: ' + product.id)),
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
