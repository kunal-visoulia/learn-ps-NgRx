import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getcurrentProduct, getProducts, getshowProductCode, State } from 'src/app/products/state/product.reducer';

import { Product } from '../product';
import * as ProductActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;

  constructor( private store: Store<State>) { }//we want the global state here so we can accer,say, user state
  //also we want the extended state in product reducer not global as global state does not contain products slice of state

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    
    this.store.dispatch(ProductActions.loadProducts());

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
    this.store.dispatch(ProductActions.setCurrentProduct({ product })); //setcurrent product action and retianthe current product in the store
  }

}
