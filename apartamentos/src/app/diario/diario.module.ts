import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiarioRoutingModule } from './diarioRoutingModule';
import { DiarioCadastroComponent } from './diario-cadastro/diario-cadastro.component';
import { DiarioPesquisaComponent } from './diario-pesquisa/diario-pesquisa.component';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    TooltipModule,

    DiarioRoutingModule
  ],
  declarations: [
    DiarioCadastroComponent,
    DiarioPesquisaComponent
  ]
})
export class DiarioModule { }
