import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InquilinoCadastroComponent } from './inquilino-cadastro/inquilino-cadastro.component';
import { InquilinoPesquisaComponent } from './inquilino-pesquisa/inquilino-pesquisa.component';

const routes: Routes = [
  { path: 'inquilinos', component: InquilinoPesquisaComponent },
  { path: 'inquilino', component: InquilinoCadastroComponent },
  { path: 'inquilino/:id', component: InquilinoCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InquilinoRoutingModule { }
