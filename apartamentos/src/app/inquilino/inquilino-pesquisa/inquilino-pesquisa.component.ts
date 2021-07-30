import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { InquilinoFiltro } from '../../core/model';
import { InquilinoService } from '../inquilinoService';

@Component({
  selector: 'app-inquilino-pesquisa',
  templateUrl: './inquilino-pesquisa.component.html',
  styleUrls: ['./inquilino-pesquisa.component.css']
})
export class InquilinoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new InquilinoFiltro();
  inquilinos = [];
  @ViewChild('tabela') grid;

  status = [
    { label: 'Selecione', value: '' },
    { label: 'Ativo', value: "ATIVO" },
    { label: 'Inativo', value: "INATIVO" },
  ];

  constructor(
    private inquilinoService: InquilinoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(){
    this.title.setTitle('Pesquisa de inquilinos');
  }

pesquisar(pagina = 0){
  this.filtro.pagina = pagina;

  this.inquilinoService.pequisar(this.filtro)
  .then(resultado =>{
    this.totalRegistros = resultado.total;
    this.inquilinos = resultado.inquilinos;
  } )
  .catch(erro => this.errorHandler.handle(erro));
}

aoMudarPagina(event: LazyLoadEvent){
 const pagina = event.first / event.rows;
 this.pesquisar(pagina);
}

confirmarExclusao(inquilino: any){
  this.confirmation.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.excluir(inquilino);
    }
   });

}

excluir(inquilino: any) {
  this.inquilinoService.excluir(inquilino.id)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.toasty.success('Inquilino excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}

