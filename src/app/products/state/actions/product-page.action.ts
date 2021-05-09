import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const toggleProductCode = createAction(
    '[Product Page] Toggle Product Code'
)

export const setCurrentProduct = createAction(
    '[Product Page] Set Current Product',
    props<{currentProductId: number }>()
)

export const clearCurrentProduct = createAction(
    '[Product Page] Clear Current Product'
)

export const initializeCurrentProduct = createAction(
    '[Product Page] Initialize Current Product'
)

//complex load operation
export const loadProducts = createAction(
    '[Product Page] Load'
)

export const updateProduct = createAction(
    '[Product Page] Update Product',
    props< { product: Product} >()// to save the changed values of the product properties we will provide the updated object as the action's data
)
