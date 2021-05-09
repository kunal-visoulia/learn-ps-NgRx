import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { getcurrentProduct, getshowProductCode, State } from 'src/app/products/state/product.reducer';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as ProductActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private productService: ProductService, private store: Store<State>) { }//we want the global state here so we can accer,say, user state
  //also we want the extended state in product reducer not global as global state does not contain products slice of state

  ngOnInit(): void {
    // TODO: unsubscribe
    this.store.select(getcurrentProduct).subscribe( //gets the currently selected product from store and highlight the product
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    // TODO: unsubscribe
    this.store.select(getshowProductCode).subscribe( showProductCode => {
        this.displayCode = showProductCode;
    } );
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct( { product } )); //setcurrent product action and retianthe current product in the store
  }

}
