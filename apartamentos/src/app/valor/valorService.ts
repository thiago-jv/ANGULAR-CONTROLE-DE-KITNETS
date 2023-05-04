import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Valor, ValorFiltro } from '../core/model';

@Injectable()
export class ValorService {

valorUrl = 'http://localhost:8089/apartamentosapi/v1/valores';

constructor(private http: Http) { }

pequisar(filtro: ValorFiltro): Promise<any>{
  const params = new URLSearchParams();
  const headers = new Headers();
  headers.append('Content-Type', 'application/json')

  params.set('page', filtro.pagina.toString());
  params.set('size', filtro.intensPorPagina.toString());

  if (filtro.valor) {
    params.set('valor', filtro.valor);
  }

  return this.http.get(`${this.valorUrl}?pesquisar`, { headers, search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const valores = responseJson.content;

      const resultado = {
        valores,
        total: responseJson.totalElements
      };

      return resultado;
    })
}

listarTodas(): Promise<any> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return this.http.get(`${this.valorUrl}/todos`, { headers })
    .toPromise()
    .then(response => response.json());
}

  excluir(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.delete(`${this.valorUrl}/${id}`, { headers })
      .toPromise()
      .then(response => null).catch(error => {
        if(error.status == 409){
          return Promise.reject("Valor de código " + `${id}` + " não pode ser removido, pois está em uso");
        }});
}


  adicionar(valor: Valor): Promise<Valor> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.valorUrl, JSON.stringify(valor), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(valor: Valor): Promise<Valor> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.valorUrl}/${valor.id}`,
        JSON.stringify(valor), { headers })
      .toPromise()
      .then(response => response.json() as Valor);
  }

  buscarPorCodigo(id: number): Promise<Valor> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.valorUrl}/${id}`, { headers })
      .toPromise()
      .then(response => response.json() as Valor);
  }

}
