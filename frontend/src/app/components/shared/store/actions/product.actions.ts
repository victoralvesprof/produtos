import { createAction, props } from "@ngrx/store";


export const getProductAction = createAction('[Product API] Fetch Product');
export const getProductActionSuccess = createAction('[Product API] Fetch Product Success', props<{products: any[]}>());
export const getProductActionFailure = createAction('[Product API] Fetch Product failure', props<{error: string}>());