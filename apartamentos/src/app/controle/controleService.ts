import { Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ControleFiltro, ControleLancamento } from '../core/model';
import * as moment from 'moment';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ControleService {

  controleUrl = 'http://localhost:8089/apartamentosapi/v1/controles';

  constructor(private http: AuthHttp) { }

  pequisar(filtro: ControleFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.intensPorPagina.toString());

    if (filtro.dataPagamentoDe) {
      params.set('dataPagamentoDe',
        moment(filtro.dataPagamentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataPagamentoAte) {
      params.set('dataPagamentoAte',
        moment(filtro.dataPagamentoAte).format('YYYY-MM-DD'));
    }

    if (filtro.entragaContaLuz) {
      params.set('entragaContaLuz', filtro.entragaContaLuz);
    }

    if (filtro.statusApartamePagamento) {
      params.set('statusApartamePagamento', filtro.statusApartamePagamento);
    }

    if (filtro.statusApartamePagamentoLuz) {
      params.set('statusApartamePagamentoLuz', filtro.statusApartamePagamentoLuz);
    }

    return this.http.get(`${this.controleUrl}?pesquisar`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const controles = responseJson.content;

        const resultado = {
          controles,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<ControleLancamento> {

    return this.http.get(`${this.controleUrl}/todos`)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.controleUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(controle: ControleLancamento): Promise<ControleLancamento> {

    return this.http.post(this.controleUrl, JSON.stringify(controle))
      .toPromise()
      .then(response => response.json()).catch(error => {
        if(error.status == 409){
          return Promise.reject("Inquilino de id  " + `${controle.inquilino.id}` + " ou "+ "Apartamento de id " + `${controle.apartamento.id}` + " não pode ser usado, pois está em uso");
        }
      });
  }

  atualizar(controle: ControleLancamento): Promise<ControleLancamento> {

    return this.http.put(`${this.controleUrl}/${controle.id}`,
        JSON.stringify(controle))
      .toPromise()
      .then(response => response.json() as ControleLancamento);
  }

  buscarPorCodigo(id: number): Promise<ControleLancamento> {

    return this.http.get(`${this.controleUrl}/${id}`)
      .toPromise()
      .then(response => {
        const controle = response.json() as ControleLancamento;

        this.converterStringsParaDatas([controle]);

        return controle;
      });
  }

  mudarStatus(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.controleUrl}/${id}/status`, {headers})
      .toPromise()
      .then(response => null).catch(error => {
        if(error.status == 409){
          return Promise.reject("Locação de código " + `${id}` + " não pode ser fechado, pois está em débito");
        }});
    }


  private converterStringsParaDatas(controles: ControleLancamento[]) {
    for (const controle of controles) {
      controle.dataPagamento = moment(controle.dataPagamento,
        'YYYY-MM-DD').toDate();

        controle.dataEntrada = moment(controle.dataEntrada,
          'YYYY-MM-DD').toDate();

        controle.dataEntrada = moment(controle.dataEntrada,
          'YYYY-MM-DD').toDate();
    }
  }

}
