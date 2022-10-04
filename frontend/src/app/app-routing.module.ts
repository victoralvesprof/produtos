import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { ConsultarComponent } from './components/consultar/consultar.component';

const routes: Routes = [
  {
    path: 'cadastrar',
    component: CadastrarComponent
  },
  {
    path: 'consultar',
    component: ConsultarComponent
  },
  {
    path: 'editar/:id',
    component: CadastrarComponent
  },
  { 
    path: '**', 
    redirectTo: 'consultar' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
