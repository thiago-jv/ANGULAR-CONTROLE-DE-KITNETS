import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ControleCadastroComponent} from './controle-cadastro/controle-cadastro.component';
import {ControlePesquisaComponent} from './controle-pesquisa/controle-pesquisa.component';
import {AuthGuard} from '../seguranca/auth.guard';

const routes: Routes = [
  {path: 'controles', component: ControlePesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LANCAMENTO']}},
  {path: 'controle', component: ControleCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LANCAMENTO']}},
  {path: 'controle/:id', component: ControleCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LANCAMENTO']}},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ControleRoutingModule {
}
