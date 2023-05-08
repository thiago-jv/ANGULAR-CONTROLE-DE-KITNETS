import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApartamentoCadastroComponent } from './apartamento-cadastro/apartamento-cadastro.component';
import { ApartamentoPesquisaComponent } from './apartamento-pesquisa/apartamento-pesquisa.component';
import {AuthGuard} from '../seguranca/auth.guard';

const routes: Routes = [
  { path: 'apartamentos', component: ApartamentoPesquisaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_APARTAMENTO'] }},
  { path: 'apartamento', component: ApartamentoCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_APARTAMENTO'] }},
  { path: 'apartamento/:id', component: ApartamentoCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_APARTAMENTO'] }},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ApartamentoRoutingModule { }
