import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { Predio } from '../../core/model';
import { PredioService } from '../predioService';

@Component({
  selector: 'app-predio-cadastro',
  templateUrl: './predio-cadastro.component.html',
  styleUrls: ['./predio-cadastro.component.css']
})
export class PredioCadastroComponent implements OnInit {

  predio = new Predio();

  constructor(private predioService: PredioService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

    console.log(this.route.snapshot.params['id']);
    const idPredio = this.route.snapshot.params['id'];
    this.title.setTitle('Novo predio')

    if(idPredio){
      this.carregarPredio(idPredio);
    }
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de predio: ${this.predio.descricao}`);
  }

  get editando(){
    return Boolean(this.predio.id)
  }

  carregarPredio(id: number) {
    this.predioService.buscarPorCodigo(id)
      .then(predio => {
        this.predio = predio;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPorCep(cep: string) {
    this.predioService.buscarPorCep(cep)
      .then(predio => {
        this.predio.cep = predio.cep;
        this.predio.logradouro = predio.logradouro;
        this.predio.complemento = predio.complemento;
        this.predio.bairro = predio.bairro;
        this.predio.localidade = predio.localidade;
        this.predio.uf = predio.uf;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarPredio(form: FormControl) {
    this.predioService.adicionar(this.predio)
      .then(predioAdicionada => {
        this.toasty.success('Predio adicionada com sucesso!');
        this.router.navigate(['/predio', predioAdicionada.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPredio(form: FormControl) {
    this.predioService.atualizar(this.predio)
      .then(predio => {
        this.predio = predio;

        this.toasty.success('predio alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    this.predio = new Predio();
    this.router.navigate(['/predio']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPredio(form);
    } else {
      this.adicionarPredio(form);
    }
  }

}

