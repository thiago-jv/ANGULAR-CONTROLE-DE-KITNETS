import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ControleCadastroComponent } from './controle-cadastro/controle-cadastro.component';
import { ControlePesquisaComponent } from './controle-pesquisa/controle-pesquisa.component';

const routes: Routes = [
  { path: 'controles', component: ControlePesquisaComponent },
  { path: 'controle', component: ControleCadastroComponent },
  { path: 'controle/:id', component: ControleCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ControleRoutingModule { }
