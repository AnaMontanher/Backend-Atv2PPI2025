//Data Acess Object - DAO
import Docente from "../Models/docente.js";
import Curso from "../Models/curso.js";
import conectar from "./conexao.js";


export default class CursoDAO {
  async gravar(curso) {
    if (curso instanceof Curso) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO curso(cur_id,cur_nome,cur_sigla,cur_carga,cur_data_inicio,cur_data_fim,cur_cont_prag, doc_cpf) VALUES (?,?,?,?,?,?,?,?)";
      const parametros = [
        curso.id,
        curso.nome,
        curso.sigla,
        curso.carga,
        curso.data_inicio,
        curso.data_fim,
        curso.cont_prag,
        curso.docente.cpf
      ];

      await conexao.execute(sql, parametros);
      conexao.release(); //devolve a coneção para o pool
    }
  }
  async alterar(curso) {
    if (curso instanceof Curso) {
      const conexao = await conectar();
      const sql =
        "UPDATE curso SET cur_nome = ? , cur_sigla = ? ,cur_carga = ? , cur_data_inicio = ? , cur_data_fim = ? , cur_cont_prag = ? , doc_cpf = ? WHERE cur_id = ? ";
      const parametros = [
        curso.nome,
        curso.sigla,
        curso.carga,
        curso.data_inicio,
        curso.data_fim,
        curso.cont_prag,        
        curso.docente.cpf,
        curso.id
      ];
      await conexao.execute(sql, parametros);   
      await conexao.release();
    }
  }
  async excluir(curso) {
    if (curso instanceof Curso) {
      const conexao = await conectar();
      const sql = "DELETE FROM curso WHERE cur_id = ?";
      const parametros = [curso.id];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async consultar() {
    const conexao = await conectar();
    const sql =
      "SELECT * from Curso cur INNER JOIN Docente doc ON cur.doc_cpf = doc.doc_cpf order by doc.doc_nome";
    const [registros] = await conexao.query(sql);
    await conexao.release();

    let listaCursos = [];
    for (const registro of registros) {
      const docente = new Docente(registro.doc_cpf,
        registro.doc_nome,
        registro.doc_sobrenome,
        registro.doc_titulacao);
      const curso = new Curso (
        registro.cur_id,
        registro.cur_nome,
        registro.cur_sigla,
        registro.cur_carga,
        registro.cur_data_inicio,
        registro.cur_data_fim,
        registro.cur_cont_prag,
        docente
      );      
      listaCursos.push(curso);
    }
    return listaCursos;
  }
}
