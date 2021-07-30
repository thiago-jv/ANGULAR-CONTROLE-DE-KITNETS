import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { ValorFiltro } from '../../core/model';
import { ValorService } from '../valorService';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-valor-pesquisa',
  templateUrl: './valor-pesquisa.component.html',
  styleUrls: ['./valor-pesquisa.component.css']
})
export class ValorPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ValorFiltro();
  valores = [];
  @ViewChild('tabela') grid;

  constructor(
    private valorService: ValorService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(){
    this.title.setTitle('Pesquisa de valores');
  }

pesquisar(pagina = 0){
  this.filtro.pagina = pagina;

  this.valorService.pequisar(this.filtro)
  .then(resultado =>{
    this.totalRegistros = resultado.total;
    this.valores = resultado.valores;
  } )
  .catch(erro => this.errorHandler.handle(erro));
}

aoMudarPagina(event: LazyLoadEvent){
 const pagina = event.first / event.rows;
 this.pesquisar(pagina);
}

confirmarExclusao(valor: any){
  this.confirmation.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.excluir(valor);
    }
   });

}

excluir(valor: any) {
  this.valorService.excluir(valor.id)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.toasty.success('Valor excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
