import Docente from "../Models/docente.js";

///esta classe irá manipular/controlar a entidade Docente
export default class DocenteCTRL {
  //HTTP POST - é um método que submete um recurso para o servidor
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      if (dados.cpf && dados.nome && dados.sobrenome && dados.titulacao) {
        const docente = new Docente(
          dados.cpf,
          dados.nome,
          dados.sobrenome,
          dados.titulacao
        );
        docente
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Docente cadastrado com sucesso.",
              docente: docente,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o docente: " + erro.message,
            });
          }); // gravar é um método assíncrono
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Informe todos os dados do docente(CPF,NOME,SOBRENOME,TITULACAO)",
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
      //http://localhost:4000/docente/123.456.789-10
      const cpf = requisicao.params.cpf; //cpf ser informado na URL
      if (dados.cpf && dados.nome && dados.sobrenome && dados.titulacao) {
        const docente = new Docente(
          cpf,
          dados.nome,
          dados.sobrenome,
          dados.titulacao
        );
        docente
          .alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Docente atualizado com sucesso.",
              docente: docente,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o docente: " + erro.message,
            });
          }); // gravar é um método assíncrono
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Informe todos os dados do docente(,NOME,SOBRENOME,TITULACAO). O CPF deve ser informado na URL",
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
      const cpf = requisicao.params.cpf;
      if (cpf) {
        //verificação de existencia de cpf
        const docente = new Docente();
        docente
          .consultarCPF(cpf)
          .then((listaDocentes) => {
            const docente = listaDocentes[0];
            if (docente) {
              docente.excluir().then(() => {
                resposta.status(200).json({
                  status: true,
                  mensagem: "Docente excluído com sucesso.",
                });
              });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Docente não encontrado",
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem:
                "Erro ao consultar o docente para exclusão: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o CPF do docente.",
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
      //qdo um cpf não for especificado então a consulta retornará todos os docentes
      const cpf = requisicao.params.cpf;
      const docente = new Docente();
      if (cpf) {
        docente
          .consultarCPF(cpf)
          .then((listaDocentes) => {
            if (listaDocentes.length > 0) {
              resposta.status(200).json({
                resposta: true,
                mensagem: "Consulta realizada com sucesso.",
                docentes: listaDocentes[0],
              });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Docente não encontrado.",
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar o docente." + erro.message,
            });
          });
      } else {
        docente
          .consultar()
          .then((listaDocentes) => {
            resposta.status(200).json({
              status: true,
              mensagem: "Consulta realizada com sucesso",
              docentes: listaDocentes,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar os docentes: " + erro.message,
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
