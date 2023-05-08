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
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FieldsetModule} from 'primeng/fieldset';
import {ToolbarModule} from 'primeng/toolbar';

import {CurrencyMaskModule} from 'ng2-currency-mask';
import {SharedModule} from '../shared/SharedModule';
import {ControleRoutingModule} from './controleRoutingModule';
import {ControleCadastroComponent} from './controle-cadastro/controle-cadastro.component';
import {ControlePesquisaComponent} from './controle-pesquisa/controle-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    InputTextareaModule,
    FieldsetModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    CurrencyMaskModule,
    CalendarModule,
    ToolbarModule,


    SelectButtonModule,
    DropdownModule,

    SharedModule,
    ControleRoutingModule
  ],
  declarations: [
    ControleCadastroComponent,
    ControlePesquisaComponent
  ],
  exports: []
})
export class ControleModule {
}
