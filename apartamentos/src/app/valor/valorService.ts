import {Headers, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Valor, ValorFiltro} from '../core/model';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ValorService {

  valorUrl = 'http://localhost:8089/apartamentosapi/v1/valores';

  constructor(private http: AuthHttp) {
  }

  pequisar(filtro: ValorFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.intensPorPagina.toString());

    if (filtro.valor) {
      params.set('valor', filtro.valor);
    }

    return this.http.get(`${this.valorUrl}?pesquisar`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const valores = responseJson.content;

        const resultado = {
          valores,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {

    return this.http.get(`${this.valorUrl}/todos`)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.valorUrl}/${id}`)
      .toPromise()
      .then(response => null).catch(error => {
        if (error.status == 409) {
          return Promise.reject('Valor de código ' + `${id}` + ' não pode ser removido, pois está em uso');
        }
      });
  }


  adicionar(valor: Valor): Promise<Valor> {

    return this.http.post(this.valorUrl, JSON.stringify(valor))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(valor: Valor): Promise<Valor> {

    return this.http.put(`${this.valorUrl}/${valor.id}`,
      JSON.stringify(valor))
      .toPromise()
      .then(response => response.json() as Valor);
  }

  buscarPorCodigo(id: number): Promise<Valor> {

    return this.http.get(`${this.valorUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Valor);
  }

}
