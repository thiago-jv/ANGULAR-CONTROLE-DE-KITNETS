import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { PredioFiltro } from '../../core/model';
import { PredioService } from '../predioService';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-predio-pesquisa',
  templateUrl: './predio-pesquisa.component.html',
  styleUrls: ['./predio-pesquisa.component.css']
})
export class PredioPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PredioFiltro();
  predios = [];
  @ViewChild('tabela') grid;

  constructor(
    private predioService: PredioService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(){
    this.title.setTitle('Pesquisa de Predios');
  }

pesquisar(pagina = 0){
  this.filtro.pagina = pagina;

  this.predioService.pequisar(this.filtro)
  .then(resultado =>{
    this.totalRegistros = resultado.total;
    this.predios = resultado.predios;
  } )
  .catch(erro => this.errorHandler.handle(erro));
}

aoMudarPagina(event: LazyLoadEvent){
 const pagina = event.first / event.rows;
 this.pesquisar(pagina);
}

confirmarExclusao(predio: any){
  this.confirmation.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.excluir(predio);
    }
   });
}

excluir(predio: any) {
  this.predioService.excluir(predio.id)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.toasty.success('Predio excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}

