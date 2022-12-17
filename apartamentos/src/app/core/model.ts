export class Endereco {
    logradouro: string;
    numero: string;
    bairro: string;
    cep: string;
  }
  
  export class Predio {
    id: number;
    descricao: string;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    uf: string;
    localidade: string;
    numero: string;
    
  }

  export class Apartamento {
    id: number;
    descricao: string;
    numero: string;
    medidor: string;
    statusApartamento: string;
    predio = new PredioId();
  }

  export class Inquilino {
    id: number;
    nome: string;
    nomeAbreviado: string;
    email: string;
    contato: string;
    cpf: string;
    status: string;
    genero: string;
  }

  export class InquilinoId {
    id: number;
  }

  export class ApartamentoId {
    id: number;
  }

  export class PredioId {
    id: number;
  }

  export class ValorId {
    id: number;
  }


  export class Valor {
    id: number;
    valor: number;
  }

  export class Status {
    entragaContaLuz: string;
    statusApartamePagamentoLuz: string;
    statusApartamePagamento: string;
    statusProximoPagamento: string;
    statusControle: true;
  }

  export class Valores {
    valorTotalDiaria: number;
    valorDiaria: number;
    valorPagoApartamento: number;
    valorApartamento: number;
    valorDebitoApartamento: number;
    dia: number;
  }

  export class ControleLancamento {
    id: number;
    dataLancamento: Date;
    dataEntrada: Date;
    dataPagamento: Date;
    observacao: string;
    status = new Status();
    valores = new Valores();
    valor = new ValorId();
    inquilino = new InquilinoId();
    apartamento = new ApartamentoId();
  }


  export class ValorFiltro {
    valor: string;
    pagina = 0;
    intensPorPagina = 10;
  }

  export class PredioFiltro {
    descricao: string;
    pagina = 0;
    intensPorPagina = 10;
  }

  export class ApartamentoFiltro {
    descricao: string;
    numero: string;
    statusApartamento: string;
    pagina = 0;
    intensPorPagina = 10;
  }

  export class InquilinoFiltro {
    nome: string;
    cpf: string;
    status: string;
    pagina = 0;
    intensPorPagina = 10;
  }

  export class ControleFiltro {
    entragaContaLuz: string;
    statusApartamePagamentoLuz: string;
    statusApartamePagamento: string;
    dataPagamentoDe: Date;
    dataPagamentoAte: Date;
    pagina = 0;
    intensPorPagina = 20;
  }