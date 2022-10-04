import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get(this.baseUrlProduct + '/produtos');
  }

  getOnlyProduct(id: string): Observable<any>{
    return this.http.get(this.baseUrlProduct + `/produtos/${id}`);
  }

  newProduct(newProduct: Produto): Observable<any> {
    return this.http.post(this.baseUrlProduct + '/produtos', newProduct);
  }

  updateProduct(editProduct: Produto): Observable<any>{
    return this.http.put(this.baseUrlProduct + `/produtos/${editProduct._id}`, editProduct);
  }

  removeProduct(id: string): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrlProduct + `/produtos/${id}`);
  }
}
