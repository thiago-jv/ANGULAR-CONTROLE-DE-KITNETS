import { LazyLoadEvent } from 'primeng/api';
import { ApartamentoFiltro } from '../../core/model';
import { DiarioService } from './../diario.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../core/ErrorHandlerService';

@Component({
  selector: 'app-diario-pesquisa',
  templateUrl: './diario-pesquisa.component.html',
  styleUrls: ['./diario-pesquisa.component.css']
})
export class DiarioPesquisaComponent implements OnInit {

  diarios = [];
  filtro = new ApartamentoFiltro();
  totalRegistros = 0;


  constructor(private diarioService: DiarioService,  private errorHandler: ErrorHandlerService){}

  ngOnInit() {
  }

    pesquisar(pagina = 0){
      this.filtro.pagina = pagina;

      this.diarioService.pesquisar(this.filtro)
      .then(resultado =>{
        this.totalRegistros = resultado.total;
        this.diarios = resultado.diarios;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    aoMudarPagina(event: LazyLoadEvent){
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
     }


  }

