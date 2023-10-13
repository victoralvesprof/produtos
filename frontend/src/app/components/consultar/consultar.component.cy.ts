import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultarComponent } from './consultar.component';
import { ConsultarModule } from './consultar.module';
import { of } from 'rxjs';
import { ProdutoService } from '../shared/services/produto.service';
import { Router } from '@angular/router';
import { Produto } from '../shared/interfaces/produto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

describe('ConsultarComponent.cy.ts', () => {
  const mockProduto = {
    _id: '',
    nome: 'teste',
    quantidade: 1,
    validade: new Date(),
    preco: 1,
    imagem: '',
    descricao: 'teste',
    lancamento: new Date(),
    compras: [
      {
        nome: 'teste',
        quantidade: 1,
        data: new Date(),
        valor: 1,
      },
    ],
  };
  const MockProdutoService = {
    getAllProducts() {
      return of([mockProduto]);
    },
    getOnlyProduct() {
      return of(true);
    },
    newProduct() {
      return of(true);
    },
    updateProduct() {
      return of(true);
    },
    removeProduct() {
      return of(true);
    },
  };

  const MockStore = {
    dispatch() {
      return true;
    },
    select() {
      return of({products: [mockProduto] as Array<Produto>});
    },
  };

  const MockMatSnackBar = {
    open() {
      return {} as MatSnackBarRef<TextOnlySnackBar>;
    },
  };

  beforeEach(() => {
    cy.mount(ConsultarComponent, {
      imports: [
        ConsultarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: ProdutoService, useValue: MockProdutoService },
        { provide: Store, useValue: MockStore },
        { provide: MatSnackBar, useValue: MockMatSnackBar },
      ],
    });
  });

  it(`${ConsultarComponent.name} should create`, () => {
    cy.mount(ConsultarComponent, {
      providers: [
        { provide: HttpClient, useValue: null },
        { provide: MatSnackBar, useValue: MockMatSnackBar },
        { provide: Store, useValue: MockStore },
      ],
    });
  });
});
