import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApartamentoCadastroComponent } from './apartamento-cadastro/apartamento-cadastro.component';
import { ApartamentoPesquisaComponent } from './apartamento-pesquisa/apartamento-pesquisa.component';

const routes: Routes = [
  { path: 'apartamentos', component: ApartamentoPesquisaComponent },
  { path: 'apartamento', component: ApartamentoCadastroComponent },
  { path: 'apartamento/:id', component: ApartamentoCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ApartamentoRoutingModule { }
