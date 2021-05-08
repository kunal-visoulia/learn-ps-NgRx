import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';


export interface State extends AppState.State{
    products: ProductState;
}
export interface ProductState{
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getshowProductCode = createSelector(
    getProductFeatureState, //selector required to retrieve the desired bit of state
    state => state.showProductCode // projector function which recives the slice of state data, manipulates it and returns it
);

export const getcurrentProduct = createSelector(
    getProductFeatureState, 
    state => state.currentProduct 
);

export const getProducts = createSelector(
    getProductFeatureState, 
    state => state.products 
);

//first argument specifies the initial store state for specific slice of store data
export const productReducer = createReducer<ProductState>(
    initialState,
    on(createAction('[Product] Toggle Product Code'), (state):ProductState => { 
        console.log("original state "+JSON.stringify(state))
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }) 
    
);