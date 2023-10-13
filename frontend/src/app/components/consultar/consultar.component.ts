import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription, concatMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { Produto } from '../shared/interfaces/produto';
import { ProdutoService } from '../shared/services/produto.service';
import { getProductAction } from '../shared/store/actions/product.actions';
import { selectProducts } from '../shared/store/selects/products.selectors';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
})
export class ConsultarComponent implements OnInit {
  dataSource!: MatTableDataSource<Produto[]>;
  displayedColumns: string[] = [
    'select',
    'nome',
    'quantidade',
    'validade',
    'preco',
    'lancamento',
  ];
  selection = new SelectionModel<Produto>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private _snackBar: MatSnackBar,
    private store: Store<{ products: Array<Produto> }>
  ) { }
  ngOnInit(): void {
    this.store.select(selectProducts).subscribe(res => this.loadProducts(res.products))
  }

  loadProducts(response: any) {
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newProduct() {
    this.router.navigate(['/cadastrar']);
  }

  editProduct() {
    console.log('ID para edição: ', this.selection.selected[0]._id);
    this.router.navigate([`/editar/${this.selection.selected[0]._id}`]);
  }

  removeProduct() {
    this.produtoService
      .removeProduct(this.selection.selected[0]._id!)
      .pipe(
        tap(() => {
          this._snackBar.open('Registro salvo com sucesso!', 'x', {
            duration: 3000,
            panelClass: 'success',
          });
          this.selection.clear();
        }),
        concatMap(() => this.produtoService.getAllProducts())
      )
      .subscribe((res: any) => {
        this.loadProducts(res);
      });
  }

  selectHandler(row: Produto) {
    if (!this.selection.isSelected(row)) {
      this.selection.clear();
    }
    this.selection.toggle(row);
  }
}
