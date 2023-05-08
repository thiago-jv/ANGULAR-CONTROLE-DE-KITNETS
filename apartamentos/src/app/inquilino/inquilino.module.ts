import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {InputMaskModule} from 'primeng/inputmask';
import {ToolbarModule} from 'primeng/toolbar';
import {DropdownModule} from 'primeng/dropdown';

import {SharedModule} from '../shared/SharedModule';
import {InquilinoRoutingModule} from './inquilinoRoutingModule';
import {InquilinoCadastroComponent} from './inquilino-cadastro/inquilino-cadastro.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InquilinoPesquisaComponent} from './inquilino-pesquisa/inquilino-pesquisa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    InputMaskModule,
    ToolbarModule,
    DropdownModule,

    SharedModule,
    InquilinoRoutingModule
  ],
  declarations: [
    InquilinoCadastroComponent,
    InquilinoPesquisaComponent
  ],
  exports: []
})
export class InquilinoModule {
}
