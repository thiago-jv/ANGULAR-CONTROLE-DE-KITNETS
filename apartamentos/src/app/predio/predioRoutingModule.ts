import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PredioCadastroComponent } from './predio-cadastro/predio-cadastro.component';
import { PredioPesquisaComponent } from './predio-pesquisa/predio-pesquisa.component';

const routes: Routes = [
  { path: 'predios', component: PredioPesquisaComponent },
  { path: 'predio', component: PredioCadastroComponent },
  { path: 'predio/:id', component: PredioCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PredioRoutingModule { }
