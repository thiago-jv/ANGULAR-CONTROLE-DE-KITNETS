import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Inquilino, InquilinoFiltro } from '../core/model';

@Injectable()
export class InquilinoService {

  inquilinoUrl = 'http://localhost:8080/inquilinos';

  constructor(private http: Http) { }

  pequisar(filtro: InquilinoFiltro): Promise<any>{
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

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

    return this.http.get(`${this.inquilinoUrl}?pesquisar`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const inquilinos = responseJson.content;

        const resultado = {
          inquilinos,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<Inquilino> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.inquilinoUrl}/todos`, { headers })
      .toPromise()
      .then(response => response.json());
  }

  listarTodosAtivos(): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.inquilinoUrl}/todos/ativos`, { headers })
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(`${this.inquilinoUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(inquilino: Inquilino): Promise<Inquilino> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.inquilinoUrl, JSON.stringify(inquilino), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(inquilino: Inquilino): Promise<Inquilino> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.inquilinoUrl}/${inquilino.id}`,
        JSON.stringify(inquilino), { headers })
      .toPromise()
      .then(response => response.json() as Inquilino);
  }

  buscarPorCodigo(id: number): Promise<Inquilino> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.inquilinoUrl}/${id}`, { headers })
      .toPromise()
      .then(response => response.json() as Inquilino);
  }

}
