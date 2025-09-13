//Data Acess Object - DAO
import Docente from "../Models/docente.js";
import conectar from "./conexao.js";

export default class DocenteDAO {
  async gravar(docente) {
    if (docente instanceof Docente) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO docente(doc_cpf,doc_nome,doc_sobrenome,doc_titulacao) VALUES (?,?,?,?)";
      const parametros = [
        docente.cpf,
        docente.nome,
        docente.sobrenome,
        docente.titulacao,
      ];
      await conexao.execute(sql, parametros);
      conexao.release(); //devolve a coneção para o pool
    }
  }
  async alterar(docente) {
    if (docente instanceof Docente) {
      const conexao = await conectar();
      const sql =
        "UPDATE docente SET doc_nome = ?, doc_sobrenome = ?, doc_titulacao = ? WHERE doc_cpf = ?";
      const parametros = [
        docente.nome,
        docente.sobrenome,
        docente.titulacao,
        docente.cpf,
      ];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async excluir(docente) {
    if (docente instanceof Docente) {
      const conexao = await conectar();
      const sql = "DELETE FROM docente WHERE doc_cpf = ?";
      const parametros = [docente.cpf];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async consultar() {
    const conexao = await conectar();
    const sql = "SELECT * from Docente";
    const [registros] = await conexao.query(sql);
    await conexao.release();

    let listaDocentes = [];
    for (const registro of registros) {
      const docente = new Docente(
        registro.doc_cpf,
        registro.doc_nome,
        registro.doc_sobrenome,
        registro.doc_titulacao
      );
      listaDocentes.push(docente);
    }
    return listaDocentes;
  }
  async consultarCPF(cpf) {
    cpf = cpf || " ";
    const conexao = await conectar();
    const sql = "SELECT * from Docente WHERE doc_cpf = ?";
    const [registros] = await conexao.query(sql);
    await conexao.release();

    let listaDocentes = [];
    for (const registro of registros) {
      const docente = new Docente(
        registro.doc_cpf,
        registro.doc_nome,
        registro.doc_sobrenome,
        registro.doc_titulacao
      );
      listaDocentes.push(docente);
    }
    return listaDocentes;
  }
}
