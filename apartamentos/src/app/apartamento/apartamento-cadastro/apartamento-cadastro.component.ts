import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { Apartamento } from '../../core/model';
import { PredioService } from '../../predio/predioService';
import { ApartamentoService } from '../apartamentoService';

@Component({
  selector: 'app-apartamento-cadastro',
  templateUrl: './apartamento-cadastro.component.html',
  styleUrls: ['./apartamento-cadastro.component.css']
})
export class ApartamentoCadastroComponent implements OnInit {

  apartamento = new Apartamento();
  predios = [];
  statusApartamentos = [
    { label: 'Disponivel', value: 'DISPONIVEL' },
    { label: 'Ocupado', value: 'OCUPADO' },
    { label: 'Manutencao', value: 'MANUTENCAO' },
  ];

  constructor(
    private apartamentoService: ApartamentoService,
    private predioService: PredioService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    const idpartamento = this.route.snapshot.params['id'];
    this.title.setTitle('Novo apartamento')
    this.carregarPredios();

    if(idpartamento){
      this.carregarApartamento(idpartamento);
    }
  }

  carregarPredios() {
    return this.predioService.listarTodas()
      .then(predios => {
        this.predios = predios
          .map(p => ({ label: p.descricao, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de apartamento: ${this.apartamento.descricao}`);
  }

  get editando(){
    return Boolean(this.apartamento.id)
  }

  carregarApartamento(id: number) {
    this.apartamentoService.buscarPorCodigo(id)
      .then(apartamento => {
        this.apartamento = apartamento;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarApartamento(form: FormControl) {
    this.apartamentoService.adicionar(this.apartamento)
      .then(apartamentoAdicionado => {
        this.toasty.success('Apartamento adicionada com sucesso!');
        this.router.navigate(['/apartamento', apartamentoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarApartamento(form: FormControl) {
    this.apartamentoService.atualizar(this.apartamento)
      .then(apartamento => {
        this.apartamento = apartamento;

        this.toasty.success('Apartamento alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    this.apartamento = new Apartamento();
    this.router.navigate(['/apartamento']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarApartamento(form);
    } else {
      this.adicionarApartamento(form);
    }
  }

}
