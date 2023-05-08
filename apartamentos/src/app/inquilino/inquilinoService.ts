import {URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Inquilino, InquilinoFiltro} from '../core/model';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class InquilinoService {

  inquilinoUrl = 'http://localhost:8089/apartamentosapi/v1/inquilinos';

  constructor(private http: AuthHttp) {
  }

  pequisar(filtro: InquilinoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.intensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }

    if (filtro.status) {
      params.set('status', filtro.status);
    }

    return this.http.get(`${this.inquilinoUrl}?pesquisar`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const inquilinos = responseJson.content;

        const resultado = {
          inquilinos,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<Inquilino> {

    return this.http.get(`${this.inquilinoUrl}/todos`)
      .toPromise()
      .then(response => response.json());
  }

  listarTodosAtivos(): Promise<any> {

    return this.http.get(`${this.inquilinoUrl}/todos/ativos`)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.inquilinoUrl}/${id}`)
      .toPromise()
      .then(response => null).catch(error => {
        if (error.status == 409) {
          return Promise.reject('Inquilino de código ' + `${id}` + ' não pode ser removido, pois está em uso');
        }
      });
  }

  adicionar(inquilino: Inquilino): Promise<Inquilino> {

    return this.http.post(this.inquilinoUrl, JSON.stringify(inquilino))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(inquilino: Inquilino): Promise<Inquilino> {

    return this.http.put(`${this.inquilinoUrl}/${inquilino.id}`,
      JSON.stringify(inquilino))
      .toPromise()
      .then(response => response.json() as Inquilino);
  }

  buscarPorCodigo(id: number): Promise<Inquilino> {

    return this.http.get(`${this.inquilinoUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Inquilino);
  }

}
