import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap,map, catchError } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductActions from './product.action';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productServie: ProductService) { }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.productServie.getProducts().pipe(
                map(products => ProductActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductActions.loadProductsFailure({error})))
            ))
        )
    })

}