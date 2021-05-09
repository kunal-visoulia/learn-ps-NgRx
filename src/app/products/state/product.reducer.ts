import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import { ProductApiActions,ProductPageActions } from './actions';

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

//first argument specifies the initial store state for specific slice of store data
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageActions.toggleProductCode, (state): ProductState => {
        console.log("original state " + JSON.stringify(state))
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductPageActions.initializeCurrentProduct, (state): ProductState => { // now selector provides the initialized code and componenet subcribes to that selector so the view get updated automaitcally see getcurrentProduct selector
        return {
            ...state,
            currentProductId:  0
        };
    }),
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => { //listens to dispatched loadProductsSuccessa action by the effects
        return {
            ...state,
            products: action.products,
            error: '' //clear old error
        };
    }),
    on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    }),
    on(ProductApiActions.updateProductsSuccess, (state, action): ProductState => { //listens to dispatched loadProductsSuccessa action by the effects
        const updatedProducts = state.products.map( //map operator to ensure we are creating a new array and not mutable array
            item => action.product.id === item.id? action.product : item
        );
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: '' //clear old error
        };
    }),
    on(ProductApiActions.updateProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    })
);