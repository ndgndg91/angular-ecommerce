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

  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClinet.get<GetResponse>(searchUrl).pipe(
      map(response => response.products)
    )   
  }
}

interface GetResponse {
  products: Product[];
}
