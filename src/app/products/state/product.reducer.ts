import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.action';

export interface State extends AppState.State {
    products: ProductState;
}
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

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getshowProductCode = createSelector(
    getProductFeatureState, //selector required to retrieve the desired bit of state
    state => state.showProductCode // projector function which recives the slice of state data, manipulates it and returns it
);

export const getcurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getcurrentProduct = createSelector(
    getProductFeatureState,
    getcurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0){
            return { id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        }
        else
        return currentProductId? state.products.find(p => p.id === currentProductId) : null;
    }
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

//first argument specifies the initial store state for specific slice of store data
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        console.log("original state " + JSON.stringify(state))
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => { // now selector provides the initialized code and componenet subcribes to that selector so the view get updated automaitcally see getcurrentProduct selector
        return {
            ...state,
            currentProductId:  0
        };
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => { //listens to dispatched loadProductsSuccessa action by the effects
        return {
            ...state,
            products: action.products,
            error: '' //clear old error
        };
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    })
);