import Curso from "../Models/curso.js";

///esta classe irá manipular/controlar a entidade Curso
export default class CursoCTRL {
  //HTTP POST - é um método que submete um recurso para o servidor
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      if (
        dados.id &&
        dados.nome &&
        dados.sigla &&
        dados.carga &&
        dados.valor &&
        dados.data_inicio &&
        dados.data_fim &&
        dados.cont_prag &&
        dados.docente
      ) {
        const curso = new Curso(
          dados.id,
          dados.nome,
          dados.sigla,
          dados.carga,
          dados.valor,
          dados.data_inicio,
          dados.data_fim,
          dados.cont_prag,
          dados.docente
        );
        curso
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Curso cadastrado com sucesso.",
              curso: curso,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o curso: " + erro.message,
            });
          }); // gravar é um método assíncrono
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Informe todos os dados do curso(ID,NOME,SIGLA,CARGA,VALOR,DATA_INICIO, DATA_FIM, CONT_PRAG,DOCENTE)",
        });
      }
    } else {
      //CODIGO 400 o erro é do usuário que fez a requisição
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }
  //HTTP PUT - tem o objetivo de atualizar/substituir o recurso no servidor
  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (
      (requisicao.method === "PUT" || requisicao.method === "PATCH") &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      //http://localhost:4000/curso/123.456.789-10
      const id = requisicao.params.id; //id ser informado na URL
      if (
        id &&
        dados.nome &&
        dados.sigla &&
        dados.carga &&
        dados.valor &&
        dados.data_inicio &&
        dados.data_fim &&
        dados.cont_prag &&
        dados.docente.cpf
      ) {
        const curso = new Curso(
          dados.id,
          dados.nome,
          dados.sigla,
          dados.carga,
          dados.valor,
          dados.data_inicio,
          dados.data_fim,
          dados.cont_prag,
          dados.docente.cpf
        );

        curso
          .alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Curso atualizado com sucesso.",
              curso: curso,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o curso: " + erro.message,
            });
          }); // gravar é um método assíncrono
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Informe todos os dados do curso(NOME,SIGLA,CARGA,VALOR,DATA_INICIO,DATA_FIM, CONT_PRAG, DOCENTE). O ID deve ser informado na URL",
        });
      }
    } else {
      //CODIGO 400 o erro é do usuário que fez a requisição
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }
  //HTTP DELETE - remove o recurso
  excluir(requisicao, resposta) {
    if (requisicao.method === "DELETE") {
      const id = requisicao.params.id;
      if (id) {
        //verificação de existencia de id
        const curso = new Curso();
        curso
          .consultarID(id)
          .then((listaCursos) => {
            const curso = listaCursos[0];
            if (curso) {
              curso.excluir().then(() => {
                resposta.status(200).json({
                  status: true,
                  mensagem: "Curso excluído com sucesso.",
                });
              });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Curso não encontrado",
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem:
                "Erro ao consultar o curso para exclusão: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o ID do curso.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida.",
      });
    }
  }
  //HTTP GET - método que solicita recurso para o servidor
  consultar(requisicao, resposta) {
    if (requisicao.method === "GET") {
      //a consulta pode ou não especificar um CPF
      //qdo um id não for especificado então a consulta retornará todos os cursos
      const id = requisicao.params.id;
      const curso = new Curso();
      if (id) {
        curso
          .consultarID(id)
          .then((listaCursos) => {
            if (listaCursos.length > 0) {
              resposta.status(200).json({
                resposta: true,
                mensagem: "Consulta realizada com sucesso.",
                cursos: listaCursos[0],
              });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Curso não encontrado.",
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar o curso." + erro.message,
            });
          });
      } else {
        curso
          .consultar()
          .then((listaCursos) => {
            resposta.status(200).json({
              status: true,
              mensagem: "Consulta realizada com sucesso",
              cursos: listaCursos,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar os cursos: " + erro.message,
            });
          });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição Inválida.",
      });
    }
  }
}
