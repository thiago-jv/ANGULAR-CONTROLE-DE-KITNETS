import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { ControleFiltro } from '../../core/model';
import { ControleService } from '../controleService';

@Component({
  selector: 'app-controle-pesquisa',
  templateUrl: './controle-pesquisa.component.html',
  styleUrls: ['./controle-pesquisa.component.css']
})
export class ControlePesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ControleFiltro();
  controles = [];
  @ViewChild('tabela') grid;
  pt: any;

  statusApartamePagamentoLuz = [
    { label: 'Selecione', value: '' },
    { label: 'Pago', value: 'PAGO' },
    { label: 'Debito', value: 'DEBITO' },
  ];

  statusApartamePagamento = [
    { label: 'Selecione', value: '' },
    { label: 'Pago', value: 'PAGO' },
    { label: 'Debito', value: 'DEBITO' },
  ];

  entragaContaLuz = [
    { label: 'Selecione', value: '' },
    { label: 'Sim', value: 'SIM' },
    { label: 'Não', value: 'NAO' },
  ];
  
  statusProximoPagamento = [
    { label: 'Selecione', value: '' },
    { label: 'Pago', value: 'PAGO' },
    { label: 'Debito', value: 'DEBITO' },
  ];

  statusControle = [
    { label: 'Selecione', value: '' },
    { label: 'Aberto', value: 'true' },
    { label: 'Fechado', value: 'false' },
  ];

  constructor(
    private controleService: ControleService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title) {}

  ngOnInit(){
    this.title.setTitle('Pesquisa de controle lancamentos');
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
  };
  }

pesquisar(pagina = 0){
  this.filtro.pagina = pagina;

  this.controleService.pequisar(this.filtro)
  .then(resultado =>{
    this.totalRegistros = resultado.total;
    this.controles = resultado.controles;
  } )
  .catch(erro => this.errorHandler.handle(erro));
}

aoMudarPagina(event: LazyLoadEvent){
 const pagina = event.first / event.rows;
 this.pesquisar(pagina);
}

confirmarExclusao(controle: any){
  this.confirmation.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.excluir(controle);
    }
   });

}

excluir(controle: any) {
  this.controleService.excluir(controle.id)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.toasty.success('Controle de lancamentos excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
}

alternarStatus(controle: any): void { 
  const novoStatus = !controle.statusControle;

  this.controleService.mudarStatus(controle.id)
    .then(() => {
      const acao = novoStatus ? 'Aberto' : 'Fechado';

      controle.statusControle = novoStatus;
      this.toasty.success(`Controle ${acao} com sucesso!`);
      this.refresh();
    })
    .catch(erro => this.errorHandler.handle(erro));
}

refresh(): void {
  window.location.reload();
}

}
