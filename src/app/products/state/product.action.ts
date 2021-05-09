import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
)

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{currentProductId: number }>()
)

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
)

export const initializeCurrentProduct = createAction(
    '[Product] Initialize Current Product'
)

//complex load operation
export const loadProducts = createAction(
    '[Product] Load'
)

export const loadProductsSuccess = createAction(
    '[Product] Load Success',
    props<{products: Product[] }>()
)

export const loadProductsFailure = createAction(
    '[Product] Load Fail',
    props<{error: string }>()
)

export const updateProduct = createAction(
    '[Product] Update Product',
    props< { product: Product} >()// to save the changed values of the product properties we will provide the updated object as the action's data
)

export const updateProductsSuccess = createAction(
    '[Product] Update Product Success',
    props<{product: Product }>() // same as above; the action's data is the updated product returned from update operation
)

export const updateProductsFailure = createAction(
    '[Product] Update Product Fail',
    props<{error: string }>()
)