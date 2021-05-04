import { createAction, createReducer, on } from "@ngrx/store";

//first argument specifies the initial store state for specific slice of store data
export const productReducer = createReducer(
    {showProductCode:true},
    on(createAction('[Product] Toggle Product Code'), state=> { 
        console.log("original state "+JSON.stringify(state))
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }) 
    
);