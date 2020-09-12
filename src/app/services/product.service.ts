import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClinet: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClinet.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response.products)
    )   
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClinet.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response.productCategoies)
    )   
  }
}

interface GetResponseProducts {
  products: Product[];
}

interface GetResponseProductCategory {
  productCategoies: ProductCategory[];
}
