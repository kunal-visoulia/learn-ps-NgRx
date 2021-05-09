import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getcurrentProduct, getError, getProducts, getshowProductCode, State } from 'src/app/products/state/product.reducer';

import { Product } from '../product';
import * as ProductActions from '../state/product.action';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

 
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor( private store: Store<State>) { }//we want the global state here so we can accer,say, user state

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getcurrentProduct);//gets the currently selected product from store and highlight the product
    this.displayCode$ = this.store.select(getshowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId : product.id })); //setcurrent product action and retian the current product in the store
  }
}
