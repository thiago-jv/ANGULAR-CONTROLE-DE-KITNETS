import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {InquilinoCadastroComponent} from './inquilino-cadastro/inquilino-cadastro.component';
import {InquilinoPesquisaComponent} from './inquilino-pesquisa/inquilino-pesquisa.component';
import {AuthGuard} from '../seguranca/auth.guard';

const routes: Routes = [
  {path: 'inquilinos', component: InquilinoPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_INQUILINO']}},
  {path: 'inquilino', component: InquilinoCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_INQUILINO']}},
  {path: 'inquilino/:id', component: InquilinoCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_INQUILINO']}},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InquilinoRoutingModule {
}
