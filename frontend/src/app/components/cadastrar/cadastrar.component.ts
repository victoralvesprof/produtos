import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  productID!: string;
  
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.productID = this.activatedRoute.snapshot.paramMap.get("id")!;
    
    if(this.productID){
      this.produtoService.getOnlyProduct(this.productID).subscribe((produto: Produto) => {
        this.initializeForm(produto);
      });
    } else {
      this.initializeForm();
    }
  }

  initializeForm(produto?: Produto) {
    this.form = this.fb.group({
      nome: [produto?.nome ?? '', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      quantidade: [produto?.quantidade ?? '', Validators.compose([
        Validators.required,
        Validators.maxLength(2)
      ])],
      validade: [produto?.validade ?? new Date(), Validators.compose([
        Validators.required
      ])],
      preco: [produto?.preco ?? '', Validators.compose([
        Validators.required
      ])],
      imagem: [produto?.imagem ?? '', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      descricao: [produto?.descricao ?? '', Validators.maxLength(300)]
    })
  }
  
  cancel(): void {
		this.router.navigate(['/consultar']);
	}

  onSubmit() {
    if(this.productID) {
      this.produtoService.updateProduct(this.form.value, this.productID).subscribe((res: any) => {
        this._snackBar.open("Registro editado com sucesso!", "x", {duration: 3000, panelClass: 'success'});
        this.form.reset();
        this.router.navigate(['/consultar']);
      });
    } else {
      this.produtoService.newProduct(this.form.value).subscribe((res: any) => {
        this._snackBar.open("Registro criado com sucesso!", "x", {duration: 3000, panelClass: 'success'});
        this.form.reset();
        this.router.navigate(['/consultar']);
      });
    }
  }
}
