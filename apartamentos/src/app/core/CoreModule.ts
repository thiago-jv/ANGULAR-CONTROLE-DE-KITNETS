import {Title} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {CommonModule, registerLocaleData} from '@angular/common';
import {LOCALE_ID, NgModule} from '@angular/core';
import localePt from '@angular/common/locales/pt';

import {NavbarComponent} from './navbar/navbar.component';

import {ToastyModule} from 'ng2-toasty';

import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {PaginaNaoEncontradaComponent} from './PaginaNaoEncontradaComponent';
import {ErrorHandlerService} from './ErrorHandlerService';
import {PredioService} from '../predio/predioService';
import {ApartamentoService} from '../apartamento/apartamentoService';
import {InquilinoService} from '../inquilino/inquilinoService';
import {ValorService} from '../valor/valorService';
import {ControleService} from '../controle/controleService';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {DiarioService} from '../diario/diario.service';
import {AuthService} from '../seguranca/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {NaoAutorizadoComponent} from './nao-autorizado.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    MenubarModule,

    ToastyModule.forRoot(),

  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
  ],
  providers: [
    ConfirmationService,
    ErrorHandlerService,
    PredioService,
    ApartamentoService,
    InquilinoService,
    ValorService,
    ControleService,
    DiarioService,
    AuthService,
    JwtHelper,

    Title,
    {provide: LOCALE_ID, useValue: 'pt'}
  ]
})
export class CoreModule {
}
