import {URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Diario, DiarioFiltro} from '../core/model';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class DiarioService {

  diarioUrl = 'http://localhost:8089/apartamentosapi/v1/diarios';

  constructor(private http: AuthHttp) {
  }

  pesquisar(filtro: DiarioFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.intensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.diarioUrl}`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const diarios = responseJson.content;

        const resultado = {
          diarios,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  adicionar(diario: Diario): Promise<Diario> {

    return this.http.post(this.diarioUrl, JSON.stringify(diario))
      .toPromise()
      .then(response => response.json());
  }


}
