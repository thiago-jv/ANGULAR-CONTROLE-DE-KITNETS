import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {CoreModule} from './core/CoreModule';
import {ApartamentoModule} from './apartamento/apartamento.module';
import {HttpModule} from '@angular/http';
import {InquilinoModule} from './inquilino/inquilino.module';
import {ValorModule} from './valor/valor.module';
import {ControleModule} from './controle/controle.module';
import {PredioModule} from './predio/predio.module';
import {AppRoutingModule} from './appRoutingModule';
import {DiarioModule} from './diario/diario.module';
import {SegurancaModule} from './seguranca/seguranca.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    PredioModule,
    ApartamentoModule,
    InquilinoModule,
    ValorModule,
    ControleModule,
    DiarioModule,
    SegurancaModule,

    CoreModule,
    AppRoutingModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
