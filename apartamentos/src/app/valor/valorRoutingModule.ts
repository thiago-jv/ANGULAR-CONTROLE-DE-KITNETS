import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ValorCadastroComponent } from './valor-cadastro/valor-cadastro.component';
import { ValorPesquisaComponent } from './valor-pesquisa/valor-pesquisa.component';

const routes: Routes = [
  { path: 'valores', component: ValorPesquisaComponent },
  { path: 'valor', component: ValorCadastroComponent },
  { path: 'valor/:id', component: ValorCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ValorRoutingModule { }
