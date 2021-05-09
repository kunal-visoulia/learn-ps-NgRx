import { createFeatureSelector, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { ProductState } from "./product.reducer";

export interface State extends AppState.State {
    products: ProductState;
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