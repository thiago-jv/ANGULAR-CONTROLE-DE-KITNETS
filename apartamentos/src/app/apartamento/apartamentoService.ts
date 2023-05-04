import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Apartamento, ApartamentoFiltro } from '../core/model';

@Injectable()
export class ApartamentoService {

  apartamentoUrl = 'http://localhost:8089/apartamentosapi/v1/apartamentos';

  constructor(private http: Http) { }

  pequisar(filtro: ApartamentoFiltro): Promise<any>{
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.intensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.numero) {
      params.set('numero', filtro.numero);
    }

    if (filtro.statusApartamento) {
      params.set('statusApartamento', filtro.statusApartamento);
    }

    return this.http.get(`${this.apartamentoUrl}?pesquisar`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const apartamentos = responseJson.content;

        const resultado = {
          apartamentos,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<Apartamento> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.apartamentoUrl}/todos`, { headers })
      .toPromise()
      .then(response => response.json());
  }

  listarTodosDisponiveis(): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.apartamentoUrl}/todos/disponiveis`, { headers })
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(`${this.apartamentoUrl}/${id}`, { headers })
      .toPromise()
      .then(response => null).catch(error => {
          if(error.status == 409){
            return Promise.reject("Apartamento de código " + `${id}` + " não pode ser removida, pois está em uso");
          }});
  }

  adicionar(apartamento: Apartamento): Promise<Apartamento> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.apartamentoUrl, JSON.stringify(apartamento), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(apartamento: Apartamento): Promise<Apartamento> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.apartamentoUrl}/${apartamento.id}`,
        JSON.stringify(apartamento), { headers })
      .toPromise()
      .then(response => response.json() as Apartamento);
  }

  buscarPorCodigo(id: number): Promise<Apartamento> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.apartamentoUrl}/${id}`, { headers })
      .toPromise()
      .then(response => response.json() as Apartamento);
  }

}
