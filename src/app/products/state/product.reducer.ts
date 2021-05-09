import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.action';

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
    on( ProductActions.toggleProductCode, (state):ProductState => { 
        console.log("original state "+JSON.stringify(state))
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductActions.setCurrentProduct, (state,action): ProductState=>{
        return {
            ...state,
            currentProduct: action.product
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState=>{
        return {
            ...state,
            currentProduct: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState=>{ // this for when adding new products we iniitialize few fields 
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName:'',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        };
    }) 
    
);