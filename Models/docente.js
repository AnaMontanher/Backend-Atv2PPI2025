import DocenteDAO from "../DB/docenteDAO.js";

export default class Docente {
  // atributos privados da classe Docente
  //# significa que o atributo é privado e só podem ser acessados
  #cpf; //chave candidata
  #nome;
  #sobrenome;
  #titulacao;


  constructor(
    cpf = 0,
    nome = "",
    sobrenome = "",
    titulacao = "",
  ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#sobrenome = sobrenome;
    this.#titulacao = titulacao;
  }

  //definir métodos de acesso públicos utilizando get e set

  get cpf() {
    return this.#cpf;
  }

  set cpf(cpf) {
    this.#cpf = cpf;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nome) {
    this.#nome = nome;
  }

  get sobrenome() {
    return this.#sobrenome;
  }

  set sobrenome(sobrenome) {
    this.#sobrenome = sobrenome;
  }
  get titulacao() {
    return this.#titulacao;
  }

  set titulacao(titulacao) {
    this.#titulacao = titulacao;
  }


  //Escolhr uma forma estruturada de representar um objeto do tipo Docente
  toString() {
    //override do método da classe Pai
    return `
    CPF: ${this.#cpf}\n
    Nome Completo: ${this.#nome} ${this.#sobrenome}\n
    Titulação: ${this.#titulacao}\n`;
  }
  //definir um formato que extrapola o ambiente de execução da aplicação
  //quando for neceesário enviar um Docente para a internet, nós vamos enviá-lo no formato JSON.
  toJSON() {
    return {
      CPF: this.#cpf,
      nome: this.#nome,
      sobrenome: this.#sobrenome,
      titulacao: this.#titulacao,
    };
  }
  async gravar() {
    const docenteDAO = new DocenteDAO();
    await docenteDAO.gravar(this);
  }
  async alterar() {
    const docenteDAO = new DocenteDAO();
    await docenteDAO.alterar(this);
  }
  async excluir() {
    const docenteDAO = new DocenteDAO();
    await docenteDAO.excluir(this);
  }
  async consultar() {
    const docenteDAO = new DocenteDAO();
    return await docenteDAO.consultar(this); //único método que RETORNA alguma informação
  }
}
