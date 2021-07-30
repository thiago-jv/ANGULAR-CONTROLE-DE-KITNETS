import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import {ToolbarModule} from 'primeng/toolbar';


import { PredioCadastroComponent } from './predio-cadastro/predio-cadastro.component';
import { SharedModule } from '../shared/SharedModule';
import { PredioRoutingModule } from './predioRoutingModule';
import { PredioPesquisaComponent } from './predio-pesquisa/predio-pesquisa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    ToolbarModule,

    SharedModule,
    PredioRoutingModule
  ],
  declarations: [
    PredioCadastroComponent,
    PredioPesquisaComponent
  ],
  exports: []
})
export class PredioModule { }
