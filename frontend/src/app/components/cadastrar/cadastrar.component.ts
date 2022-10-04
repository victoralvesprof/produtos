import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Produto } from '../shared/interfaces/produto';
import { ProdutoService } from '../shared/services/produto.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  isEditar: boolean = false;
  produto: Produto = {
    nome: "",
    quantidade: 0,
    validade: new Date(),
    preco: 0,
    imagem: "",
    descricao: "",
    lancamento: new Date(0),
    compras: []
  };

  form = this.fb.group({
    name: ['', {
      Validators: [
        Validators.required
      ]
    }],
    quantidade: ['', {
      Validators: [
        Validators.required
      ]
    }],
    validade: [new Date().toISOString(), {
      Validators: [
        Validators.required
      ]
    }],
    preco: ['', {
      Validators: [
        Validators.required
      ]
    }],
    imagem: ['', {}],
    descricao: ['', {}]
  });  
  
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private produtoService: ProdutoService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.isEditar = true;
      this.produtoService.getOnlyProduct(id).subscribe((res: any) => {
        console.log("RESPOSTA edicao produto: ", res);
        this.produto = res;
      });
    }
  }

  get name() {
    return this.form.controls['name'];
  }

  get quantidade() {
    return this.form.controls['quantidade'];
  }

  get validade() {
    return this.form.controls['validade'];
  }

  get preco() {
    return this.form.controls['preco'];
  }

  get imagem() {
    return this.form.controls['imagem'];
  }

  get descricao() {
    return this.form.controls['descricao'];
  }
  
  cancel(): void {
		this.router.navigate(['/consultar']);
	}

  onSubmit() {
    if(this.isEditar) {
      this.produtoService.updateProduct(this.produto).subscribe((res: any) => {
        console.log("RESPOSTA edicao produto: ", res);
        this._snackBar.open("Registro editado com sucesso!", "x", {duration: 3000, panelClass: 'success'});
        this.form.reset();
        this.router.navigate(['/consultar']);
      });
    } else {
      const newProduct = this.constructorNewProduct();
      this.produtoService.newProduct(newProduct).subscribe((res: any) => {
        console.log("RESPOSTA novo produto: ", res);
        this._snackBar.open("Registro criado com sucesso!", "x", {duration: 3000, panelClass: 'success'});
        this.router.navigate(['/consultar']);
        this.form.reset();
      });
    }
  }

  constructorNewProduct(): Produto {
    const copy: Produto = JSON.parse(JSON.stringify(this.produto));
    
    copy.nome = this.form.value.name as string;
    copy.quantidade = Number(this.form.value.quantidade);
    copy.validade = new Date(this.form.value.validade as string);
    copy.preco = Number(this.form.value.preco);
    copy.imagem = this.form.value.imagem as string;
    copy.descricao = this.form.value.descricao as string;
    copy.compras = [];

    return copy;
  }
}
