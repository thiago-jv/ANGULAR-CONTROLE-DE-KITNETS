import {Headers, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Apartamento, ApartamentoFiltro} from '../core/model';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ApartamentoService {

  apartamentoUrl = 'http://localhost:8089/apartamentosapi/v1/apartamentos';

  constructor(private http: AuthHttp) {
  }

  pequisar(filtro: ApartamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

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

    return this.http.get(`${this.apartamentoUrl}?pesquisar`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const apartamentos = responseJson.content;

        const resultado = {
          apartamentos,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodosDisponiveis(): Promise<any> {

    return this.http.get(`${this.apartamentoUrl}/todos/disponiveis`)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.apartamentoUrl}/${id}`)
      .toPromise()
      .then(response => null).catch(error => {
        if (error.status == 409) {
          return Promise.reject('Apartamento de código ' + `${id}` + ' não pode ser removida, pois está em uso');
        }
      });
  }

  adicionar(apartamento: Apartamento): Promise<Apartamento> {

    return this.http.post(this.apartamentoUrl, JSON.stringify(apartamento))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(apartamento: Apartamento): Promise<Apartamento> {

    return this.http.put(`${this.apartamentoUrl}/${apartamento.id}`,
      JSON.stringify(apartamento))
      .toPromise()
      .then(response => response.json() as Apartamento);
  }

  buscarPorCodigo(id: number): Promise<Apartamento> {

    return this.http.get(`${this.apartamentoUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Apartamento);
  }

}
