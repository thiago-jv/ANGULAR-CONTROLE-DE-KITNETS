import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PredioCadastroComponent} from './predio-cadastro/predio-cadastro.component';
import {PredioPesquisaComponent} from './predio-pesquisa/predio-pesquisa.component';
import {AuthGuard} from '../seguranca/auth.guard';

const routes: Routes = [
  {path: 'predios', component: PredioPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_PREDIO']}},
  {path: 'predio', component: PredioCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_PREDIO']}},
  {path: 'predio/:id', component: PredioCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_PREDIO']}},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PredioRoutingModule {
}
