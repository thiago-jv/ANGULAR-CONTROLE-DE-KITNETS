import {URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Predio, PredioFiltro} from '../core/model';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class PredioService {

  predioUrl = 'http://localhost:8089/apartamentosapi/v1/predios';

  constructor(private http: AuthHttp) {
  }

  pequisar(filtro: PredioFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.intensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.predioUrl}?pesquisar`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const predios = responseJson.content;

        const resultado = {
          predios,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {

    return this.http.get(`${this.predioUrl}/todos`)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.predioUrl}/${id}`)
      .toPromise()
      .then(response => null).catch(error => {
        if (error.status == 409) {
          return Promise.reject('Predio de código ' + `${id}` + ' não pode ser removido, pois está em uso');
        }
      });
  }

  adicionar(predio: Predio): Promise<Predio> {

    return this.http.post(this.predioUrl, JSON.stringify(predio))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(predio: Predio): Promise<Predio> {

    return this.http.put(`${this.predioUrl}/${predio.id}`,
      JSON.stringify(predio))
      .toPromise()
      .then(response => response.json() as Predio);
  }

  buscarPorCodigo(id: number): Promise<Predio> {

    return this.http.get(`${this.predioUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Predio);
  }

  buscarPorCep(cep: string): Promise<Predio> {

    return this.http.get(`${this.predioUrl}/cep/${cep}`)
      .toPromise()
      .then(response => response.json() as Predio);
  }

}
