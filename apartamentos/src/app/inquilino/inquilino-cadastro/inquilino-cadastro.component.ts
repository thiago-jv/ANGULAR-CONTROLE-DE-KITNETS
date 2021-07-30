import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { Inquilino } from '../../core/model';
import { InquilinoService } from '../inquilinoService';

@Component({
  selector: 'app-inquilino-cadastro',
  templateUrl: './inquilino-cadastro.component.html',
  styleUrls: ['./inquilino-cadastro.component.css']
})
export class InquilinoCadastroComponent implements OnInit {

  inquilino = new Inquilino();

  status = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' },
  ];

  generos = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Femenino', value: 'FEMENINO' },
    { label: 'Outros', value: 'OUTROS' },
  ];

  constructor(private inquilinoService: InquilinoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

    ngOnInit() {
      console.log(this.route.snapshot.params['id']);
      const idInquilino = this.route.snapshot.params['id'];
      this.title.setTitle('Novo inquilino')
  
      if(idInquilino){
        this.carregarInquilino(idInquilino);
      }
    }
  
    carregarInquilino(id: number) {
      this.inquilinoService.buscarPorCodigo(id)
        .then(inquilino => {
          this.inquilino = inquilino;
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  
    atualizarTituloEdicao(){
      this.title.setTitle(`Edição de inquilino: ${this.inquilino.nome}`);
    }
  
    get editando(){
      return Boolean(this.inquilino.id)
    }
  
    adicionarInquilino(form: FormControl) {
      this.inquilinoService.adicionar(this.inquilino)
        .then(inquilinoAdicionado => {
          this.toasty.success('Inquilino adicionada com sucesso!');
          this.router.navigate(['/inquilino', inquilinoAdicionado.id]);
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  
    atualizarInquilino(form: FormControl) {
      this.inquilinoService.atualizar(this.inquilino)
        .then(inquilino => {
          this.inquilino = inquilino;
  
          this.toasty.success('Inquilino alterado com sucesso!');
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  
    novo(form: FormControl) {
      form.reset();
      this.inquilino = new Inquilino();
      this.router.navigate(['/inquilino']);
    }
  
    salvar(form: FormControl) {
      if (this.editando) {
        this.atualizarInquilino(form);
      } else {
        this.adicionarInquilino(form);
      }
    }
  
  }
  
