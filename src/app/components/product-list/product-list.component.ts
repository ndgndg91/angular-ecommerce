import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  courrentCatgoryId: number;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){

    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      // get the "id" param string. convert string to a number using th "+" symbol
      this.courrentCatgoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // not category id available .. default to category id 1
      this.courrentCatgoryId = 1;
    }
    
    // now get the products for the given category id
    this.productService.getProductList(this.courrentCatgoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
