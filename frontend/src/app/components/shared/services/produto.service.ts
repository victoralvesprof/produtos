import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from "src/environments/environment";
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  baseUrlProduct: string = environment.bffProdutos;

  constructor(public http: HttpClient) { }

  getAllProducts(): Observable<any> {
    // const headers = new HttpHeaders()
    //   .append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    //   .append('Content-Type', 'application/json; charset=utf-8')
    //   .append('ETag', `W/"e26-lchCs6o6uvrNdfq6rONJlBa7gw4"`)
    //   .append('Access-Control-Allow-Origin', '*')
    //   .append('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS')
    return this.http.get(this.baseUrlProduct + '/produtos').pipe(tap((res: any) => console.table(res)));
  }

  getOnlyProduct(id: string): Observable<any>{
    return this.http.get(this.baseUrlProduct + `/produtos/${id}`).pipe(tap((res: any) => console.log("get 1: ", res)));
  }

  newProduct(newProduct: Produto): Observable<any> {
    return this.http.post(this.baseUrlProduct + '/produtos', newProduct).pipe(tap((res: any) => console.log("save: ", res)));;
  }

  updateProduct(editProduct: Produto, id: string): Observable<any>{
    console.log("body bff: ", editProduct)
    return this.http.put(this.baseUrlProduct + `/produtos/${id}`, editProduct).pipe(tap((res: any) => console.log("update: ", res)));
  }

  removeProduct(id: string): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrlProduct + `/produtos/${id}`).pipe(tap((res: any) => console.log("delete: ", res)));
  }
}
