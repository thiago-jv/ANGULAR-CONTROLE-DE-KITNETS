import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ValorCadastroComponent} from './valor-cadastro/valor-cadastro.component';
import {ValorPesquisaComponent} from './valor-pesquisa/valor-pesquisa.component';
import {AuthGuard} from '../seguranca/auth.guard';

const routes: Routes = [
  {path: 'valores', component: ValorPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_VALOR']}},
  {path: 'valor', component: ValorCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_VALOR']}},
  {path: 'valor/:id', component: ValorCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_VALOR']}},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ValorRoutingModule {
}
