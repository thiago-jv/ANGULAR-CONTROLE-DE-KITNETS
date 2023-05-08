import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NaoAutorizadoComponent} from './core/nao-autorizado.component';

const routes: Routes = [

  {path: 'apartamento', loadChildren: 'app/apartamento/apartamento.module#ApartamentoModule'},
  {path: 'predio', loadChildren: 'app/predio/predio.module#PredioModule'},
  {path: 'inquilino', loadChildren: 'app/inquilino/inquilino.module#InquilinoModule'},
  {path: 'valor', loadChildren: 'app/valor/valor.module#ValorModule'},
  {path: 'controle', loadChildren: 'app/controle/controle.module#ControleModule'},
  {path: 'diario', loadChildren: 'app/diario/diario.module#DiarioModule'},
  {path: '**', redirectTo: 'pagina-nao-encontrada'},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
