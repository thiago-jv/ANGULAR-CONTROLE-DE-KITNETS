import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DiarioCadastroComponent} from './diario-cadastro/diario-cadastro.component';
import {DiarioPesquisaComponent} from './diario-pesquisa/diario-pesquisa.component';
import {AuthGuard} from '../seguranca/auth.guard';

const routes: Routes = [
  {path: 'diarios', component: DiarioPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DIARIO']}},
  {path: 'diario', component: DiarioCadastroComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_DIARIO']}},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DiarioRoutingModule {
}
