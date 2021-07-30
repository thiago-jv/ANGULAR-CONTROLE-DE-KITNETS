import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { ApartamentoFiltro } from '../../core/model';
import { ApartamentoService } from '../apartamentoService';

@Component({
  selector: 'app-apartamento-pesquisa',
  templateUrl: './apartamento-pesquisa.component.html',
  styleUrls: ['./apartamento-pesquisa.component.css']
})
export class ApartamentoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ApartamentoFiltro();
  apartamentos = [];
  @ViewChild('tabela') grid;

  statusApartamento = [
    { label: 'Selecione', value: '' },
    { label: 'DISPONIVEL', value: 'DISPONIVEL' },
    { label: 'OCUPADO', value: 'OCUPADO' },
    { label: 'MANUTENCAO', value: 'MANUTENCAO' },
  ];

  constructor(
    private apartamentoService: ApartamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(){
    this.title.setTitle('Pesquisa de apartamentos');
  }

pesquisar(pagina = 0){
  this.filtro.pagina = pagina;

  this.apartamentoService.pequisar(this.filtro)
  .then(resultado =>{
    this.totalRegistros = resultado.total;
    this.apartamentos = resultado.apartamentos;
  } )
  .catch(erro => this.errorHandler.handle(erro));
}

aoMudarPagina(event: LazyLoadEvent){
 const pagina = event.first / event.rows;
 this.pesquisar(pagina);
}

confirmarExclusao(apartamento: any){
  this.confirmation.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.excluir(apartamento);
    }
   });

}

excluir(apartamento: any) {
  this.apartamentoService.excluir(apartamento.id)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.toasty.success('Apartamento excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
