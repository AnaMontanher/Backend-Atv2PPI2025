import CursoDAO from "../DB/cursoDAO.js";

export default class Curso {
  // atributos privados da classe Curso
  //# significa que o atributo é privado e só podem ser acessados
  #id; //chave primária
  #nome;
  #sigla;
  #carga;
  #data_inicio;
  #data_fim;
  #cont_prag;
  #docente;

  constructor(
    id = 0,
    nome = "",
    sigla = "",
    carga = 0,
    data_inicio = "",
    data_fim = "",
    cont_prag = "",
    docente = ""
  ) {
    this.#id = id;
    this.#nome = nome;
    this.#sigla = sigla;
    this.#carga = carga;
    this.#data_inicio = data_inicio;
    this.#data_fim = data_fim; 
    this.#cont_prag = cont_prag;
    this.#docente = docente//Relacionamento da classe cliente e data_fim
  }

  //definir métodos de acesso públicos utilizando get e set

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nome) {
    this.#nome = nome;
  }

  get sigla() {
    return this.#sigla;
  }

  set sigla(sigla) {
    this.#sigla = sigla;
  }
  get carga() {
    return this.#carga;
  }

  set carga(carga) {
    this.#carga = carga;
  }

  get data_inicio() {
    return this.#data_inicio;
  }

  set data_inicio(data_inicio) {
    this.#data_inicio = data_inicio;
  }
  get data_fim() {
    return this.#data_fim;
  }

  set data_fim(data_fim) {
    this.#data_fim = data_fim;
  }

    get cont_prag() {
    return this.#cont_prag;
  }

  set cont_prag(cont_prag) {
    this.#cont_prag = cont_prag;
  }
 
    get docente() {
    return this.#docente;
  }

  set docente(docente) {
    this.#docente = docente;
  }
  //Escolhr uma forma estruturada de representar um objeto do tipo cliente
  toString() {
    //override do método da classe Pai
    return `
    ID: ${this.#id}\n
    Nome do Curso: ${this.#nome} - ${this.#sigla}\n
    Carga Horária: ${this.#carga}\n
    Data_inicio: ${this.#data_inicio}\n
    Data_fim: ${this.#data_fim}\n
    Conteúdo Pragramático: ${this.#cont_prag}\n
    Docente:${this.#docente}
`;
  }
  //definir um formato que extrapola o ambiente de execução da aplicação
  //quando for neceesário enviar um cliente para a internet, nós vamos enviá-lo no formato JSON.
  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      sigla: this.#sigla,
      carga: this.#carga,
      data_inicio: this.#data_inicio,
      data_fim: this.#data_fim,
      cont_prag: this.#cont_prag,
      docente: this.#docente
    };
  }
  async gravar() {
    const cursoDAO = new CursoDAO();
    await cursoDAO.gravar(this);
  }
  async alterar() {
    const cursoDAO = new CursoDAO();
    await cursoDAO.alterar(this);
  }
  async excluir() {
    const cursoDAO = new CursoDAO();
    await cursoDAO.excluir(this);
  }
  async consultar() {
    const cursoDAO = new CursoDAO();
    return await cursoDAO.consultar(this); //único método que RETORNA alguma informação
  }
}