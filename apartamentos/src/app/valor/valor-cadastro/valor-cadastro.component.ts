import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { Valor } from '../../core/model';
import { ValorService } from '../valorService';

@Component({
  selector: 'app-valor-cadastro',
  templateUrl: './valor-cadastro.component.html',
  styleUrls: ['./valor-cadastro.component.css']
})
export class ValorCadastroComponent implements OnInit {

  valor = new Valor();

  constructor(
    private valorService: ValorService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }


    ngOnInit() {
      console.log(this.route.snapshot.params['id']);
      const idvalor = this.route.snapshot.params['id'];
      this.title.setTitle('Novo valor')
      
      if(idvalor){
        this.carregarValor(idvalor);
      }
    }
  
    atualizarValorEdicao(){
      this.title.setTitle(`Edição de valor: ${this.valor.valor}`);
    }
  
    get editando(){
      return Boolean(this.valor.id)
    }
  
    carregarValor(id: number) {
      this.valorService.buscarPorCodigo(id)
        .then(valor => {
          this.valor = valor;
          this.atualizarValorEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  
    adicionarValor(form: FormControl) {
      this.valorService.adicionar(this.valor)
        .then(valorAdicionado => {
          this.toasty.success('Valor adicionada com sucesso!');
          this.router.navigate(['/valor', valorAdicionado.id]);
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  
    atualizarValor(form: FormControl) {
      this.valorService.atualizar(this.valor)
        .then(valor => {
          this.valor = valor;
  
          this.toasty.success('Valor alterado com sucesso!');
          this.atualizarValorEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  
    novo(form: FormControl) {
      form.reset();
      this.valor = new Valor();
      this.router.navigate(['/valor']);
    }
  
    salvar(form: FormControl) {
      if (this.editando) {
        this.atualizarValor(form);
      } else {
        this.adicionarValor(form);
      }
    }
  
  }