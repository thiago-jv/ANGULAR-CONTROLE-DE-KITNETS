import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {ToolbarModule} from 'primeng/toolbar';


import {SharedModule} from '../shared/SharedModule';
import {ApartamentoCadastroComponent} from './apartamento-cadastro/apartamento-cadastro.component';
import {ApartamentoRoutingModule} from './apartamentoRoutingModule';
import {ApartamentoPesquisaComponent} from './apartamento-pesquisa/apartamento-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    CalendarModule,
    ToolbarModule,

    SelectButtonModule,
    DropdownModule,

    SharedModule,
    ApartamentoRoutingModule
  ],
  declarations: [
    ApartamentoCadastroComponent,
    ApartamentoPesquisaComponent
  ],
  exports: []
})
export class ApartamentoModule {
}
