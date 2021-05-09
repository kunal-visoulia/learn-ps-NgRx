import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const loadProductsSuccess = createAction(
    '[Product API] Load Success',
    props<{products: Product[] }>()
)

export const loadProductsFailure = createAction(
    '[Product API] Load Fail',
    props<{error: string }>()
)

export const updateProductsSuccess = createAction(
    '[Product API] Update Product Success',
    props<{product: Product }>() // same as above; the action's data is the updated product returned from update operation
)

export const updateProductsFailure = createAction(
    '[Product API] Update Product Fail',
    props<{error: string }>()
)