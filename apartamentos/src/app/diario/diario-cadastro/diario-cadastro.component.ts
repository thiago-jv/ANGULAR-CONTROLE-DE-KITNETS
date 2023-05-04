import { Component, OnInit } from '@angular/core';
import { Diario } from '../../core/model';
import { FormControl } from '@angular/forms';
import { DiarioService } from '../diario.service';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-diario-cadastro',
  templateUrl: './diario-cadastro.component.html',
  styleUrls: ['./diario-cadastro.component.css']
})
export class DiarioCadastroComponent implements OnInit {

  diario = new Diario();

  constructor(
    private diarioService: DiarioService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {
  }

  adicionarDiario(form: FormControl) {
    this.diarioService.adicionar(this.diario)
      .then(diarioAdicionado => {
        this.toasty.success('Diario adicionada com sucesso!');
        this.router.navigate(['/diario', diarioAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de diario: ${this.diario.descricao}`);
  }

  get editando(){
    return Boolean(this.diario.id)
  }

  novo(form: FormControl) {
    form.reset();
    this.diario = new Diario();
    this.router.navigate(['/diario']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.adicionarDiario(form);
    } else {
      this.adicionarDiario(form);
    }
  }

}
