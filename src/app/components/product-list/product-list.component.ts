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
  currentCatgoryId: number = 1;
  previousCategoryId: number = 1;
  searchModule: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchModule = this.route.snapshot.paramMap.has('keyword');

    if (this.searchModule) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    //now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using th "+" symbol
      this.currentCatgoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // not category id available .. default to category id 1
      this.currentCatgoryId = 1;
    }

    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed

    // if ew have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId !== this.currentCatgoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCatgoryId;

    console.log(`currentCategoryId=${this.currentCatgoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1, 
                                              this.thePageSize, 
                                              this.currentCatgoryId)
                                              .subscribe(this.processResult());

  }

  processResult() {
    return data => {
      this.products = data.products;
      this.thePageNumber = data.page.current + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    console.log(pageSize);
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
}