import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastyService} from 'ng2-toasty';
import {ApartamentoService} from '../../apartamento/apartamentoService';
import {ErrorHandlerService} from '../../core/ErrorHandlerService';
import {ControleLancamento} from '../../core/model';
import {InquilinoService} from '../../inquilino/inquilinoService';
import {ValorService} from '../../valor/valorService';
import {ControleService} from '../controleService';

@Component({
  selector: 'app-controle-cadastro',
  templateUrl: './controle-cadastro.component.html',
  styleUrls: ['./controle-cadastro.component.css']
})
export class ControleCadastroComponent implements OnInit {

  controle = new ControleLancamento();
  inquilinos = [];
  apartamentos = [];
  valores = [];

  statusApartamePagamentoLuz = [
    {label: 'Pago', value: 'PAGO'},
    {label: 'Debito', value: 'DEBITO'},
  ];

  statusApartamePagamento = [
    {label: 'Pago', value: 'PAGO'},
    {label: 'Debito', value: 'DEBITO'},
  ];

  entragaContaLuz = [
    {label: 'Sim', value: 'SIM'},
    {label: 'Não', value: 'NAO'},
  ];
  statusProximoPagamento = [
    {label: 'Pago', value: 'PAGO'},
    {label: 'Debito', value: 'DEBITO'},
  ];

  pt: any;

  constructor(
    private controleService: ControleService,
    private inquilinoService: InquilinoService,
    private apartamentoService: ApartamentoService,
    private valoresService: ValorService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    const idcontrole = this.route.snapshot.params['id'];
    this.title.setTitle('Novo controle');
    this.controle.status.entragaContaLuz = 'NAO';
    this.controle.status.statusProximoPagamento = 'DEBITO';
    this.controle.status.statusApartamePagamentoLuz = 'DEBITO';

    this.carregarValores();
    this.carregarApartamentos();
    this.carregarInquilinos();

    if (idcontrole) {
      this.carregarControles(idcontrole);
    }
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


  carregarValores() {
    return this.valoresService.listarTodas()
      .then(valores => {
        this.valores = valores
          .map(v => ({label: v.valor, value: v.id}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarApartamentos() {
    return this.apartamentoService.listarTodosDisponiveis()
      .then(apartamentos => {
        this.apartamentos = apartamentos
          .map(v => ({label: v.descricao, value: v.id}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarInquilinos() {
    return this.inquilinoService.listarTodosAtivos()
      .then(inquilinos => {
        this.inquilinos = inquilinos
          .map(i => ({label: i.nome, value: i.id}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarControleEdicao() {
    this.title.setTitle(`Edição de lancamento: ${this.controle.id}`);
  }

  get editando() {
    return Boolean(this.controle.id);
  }

  buscarPorIdValor(id: number) {
    this.valoresService.buscarPorCodigo(id)
      .then(valor => {
        this.controle.valores.valorApartamento = valor.valor;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarControles(id: number) {
    this.controleService.buscarPorCodigo(id)
      .then(controle => {
        this.controle = controle;
        this.atualizarControleEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarControles(form: FormControl) {
    this.controleService.adicionar(this.controle)
      .then(controleAdicionado => {
        this.toasty.success('Controle adicionada com sucesso!');
        this.router.navigate(['/controle', controleAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarControles(form: FormControl) {
    this.controleService.atualizar(this.controle)
      .then(controle => {
        this.controle = controle;

        this.toasty.success('Controle alterado com sucesso!');
        this.atualizarControleEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    this.controle = new ControleLancamento();
    this.router.navigate(['/controle']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarControles(form);
    } else {
      this.adicionarControles(form);
    }
  }


}
