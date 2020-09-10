import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClinet: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClinet.get<GetResponse>(this.baseUrl).pipe(
      map(response => response.products)
    )   
  }
}

interface GetResponse {
  products: Product[];
}
