import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DiarioCadastroComponent } from './diario-cadastro/diario-cadastro.component';
import { DiarioPesquisaComponent } from './diario-pesquisa/diario-pesquisa.component';

const routes: Routes = [
  { path: 'diarios', component: DiarioPesquisaComponent },
  { path: 'diario', component: DiarioCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DiarioRoutingModule { }
