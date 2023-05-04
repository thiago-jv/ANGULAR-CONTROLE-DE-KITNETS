import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Diario, DiarioFiltro } from '../core/model';

@Injectable()
export class DiarioService {

  diarioUrl = 'http://localhost:8089/apartamentosapi/v1/diarios';

  constructor(private http: Http) { }

  pesquisar(filtro: DiarioFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.intensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.diarioUrl}`, { headers, search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const diarios = responseJson.content;

      const resultado = {
        diarios,
        total: responseJson.totalElements
      };

      return resultado;
    })
  }

  adicionar(diario: Diario): Promise<Diario> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.diarioUrl, JSON.stringify(diario), { headers })
      .toPromise()
      .then(response => response.json());
  }


}
