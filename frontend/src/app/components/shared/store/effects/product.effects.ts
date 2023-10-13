import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ProdutoService } from '../../services/produto.service';
import { getProductAction, getProductActionSuccess, getProductActionFailure } from '../actions/product.actions';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductAction),
      mergeMap(() =>
        this.produtoService.getAllProducts().pipe(
          map((products) => getProductActionSuccess({ products })),
          catchError((error) => of(getProductActionFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private produtoService: ProdutoService
  ) {}
}
