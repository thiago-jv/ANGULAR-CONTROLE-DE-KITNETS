import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Predio, PredioFiltro } from '../core/model';

@Injectable()
export class PredioService {

  predioUrl = 'http://localhost:8089/apartamentosapi/v1/predios';

  constructor(private http: Http) { }

  pequisar(filtro: PredioFiltro): Promise<any>{
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.intensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.predioUrl}?pesquisar`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const predios = responseJson.content;

        const resultado = {
          predios,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.predioUrl}/todos`, { headers })
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(`${this.predioUrl}/${id}`, { headers })
      .toPromise()
      .then(response => null).catch(error => {
        if(error.status == 409){
          return Promise.reject("Predio de código " + `${id}` + " não pode ser removido, pois está em uso");
        }});
}

  adicionar(predio: Predio): Promise<Predio> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.predioUrl, JSON.stringify(predio), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(predio: Predio): Promise<Predio> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.predioUrl}/${predio.id}`,
        JSON.stringify(predio), { headers })
      .toPromise()
      .then(response => response.json() as Predio);
  }

  buscarPorCodigo(id: number): Promise<Predio> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.predioUrl}/${id}`, { headers })
      .toPromise()
      .then(response => response.json() as Predio);
  }

  buscarPorCep(cep: string): Promise<Predio> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.predioUrl}/cep/${cep}`, { headers })
      .toPromise()
      .then(response => response.json() as Predio);
  }

}
