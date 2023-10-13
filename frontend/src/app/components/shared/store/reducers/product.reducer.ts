import { createReducer, on } from '@ngrx/store';
import { getProductActionSuccess } from '../actions/product.actions';
import { Produto } from '../../interfaces/produto';

export const initialState: any = [];

export const productReducer = createReducer(
  initialState,
  on(getProductActionSuccess, (state, { products }) => {
    return {
      ...state,
      products
    };
  })
);
