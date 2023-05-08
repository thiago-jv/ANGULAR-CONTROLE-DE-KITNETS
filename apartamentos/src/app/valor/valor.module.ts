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
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {ToolbarModule} from 'primeng/toolbar';

import {SharedModule} from '../shared/SharedModule';
import {ValorRoutingModule} from './valorRoutingModule';
import {ValorCadastroComponent} from './valor-cadastro/valor-cadastro.component';
import {ValorPesquisaComponent} from './valor-pesquisa/valor-pesquisa.component';

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

    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,

    SharedModule,
    ValorRoutingModule
  ],
  declarations: [
    ValorCadastroComponent,
    ValorPesquisaComponent
  ],
  exports: []
})
export class ValorModule {
}
