import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap,map, catchError, concatMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductActions from './product.action';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productServie: ProductService) { }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe( //we react to any dispatched aaction
            ofType(ProductActions.loadProducts), ///the action type we want
            mergeMap(() => this.productServie.getProducts().pipe(
                map(products => ProductActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductActions.loadProductsFailure({error})))
            ))
        )
    })

    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            concatMap((action) => this.productServie.updateProduct(action.product).pipe( //updateProduct method also returns an observable. We don't want nested observables, so we use a higher order mapping operator, such as concatMap, to merge and flatten the two observables, the one from our action and the one returned from the updateProduct method. 
                map(product => ProductActions.updateProductsSuccess({ product })),
                catchError(error => of(ProductActions.updateProductsFailure({error})))
            ))
        )
    })

}