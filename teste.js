import Curso from "./Models/curso.js";
import Docente from "./Models/docente.js";

//***MÉTODO GRAVAR */

const docente = new Docente("654.875.555-00", "Ryan", "Refacho", "Mestrado");

await docente.gravar();
console.log("Docente cadastrado com sucesso!");

const curso = new Curso(
  1,
  "CURSO BÁSICO DE PYTHON",
  "CBP",
  45,
  80.0,
  "2025-02-01",
  "2025-12-30",
  "Introdução à 'Introdução à Programação e Lógica:Conceitos de raciocínio lógico e como aplicá-lo em problemas do dia a dia. Noções Básicas de Python:O ambiente de programação, sintaxe básica e a configuração do Python. Variáveis e Tipos de Dados:Como declarar variáveis, usar diferentes tipos de dados (números, strings, booleanos) e os tipos de dados apropriados para cada problema. Operações e Estruturas de Controle:Realização de operações matemáticas, uso de operadores e a aplicação de estruturas de controle como condicionais (if/else) e loops (for/while)'.",
  docente
);

await curso.gravar();
console.log("Curso cadastrado com sucesso!");

//***MÉTODO ALTERAR

// curso2.sigla = "CBP2";
// await curso2.alterar();
// console.log("Curso alterado com sucesso!");

//***MÉTODO EXCLUIR ***
// await curso2.excluir();
// console.log("Curso excluído com sucesso!");

//***MÉTODO CONSULTAR */

const listaCursos = await curso.consultar();
for (const curso of listaCursos) {
  console.log(curso.toJSON());
}

console.log("Cursos consultados.");

// const listaDocentes = await docente.consultar();
// for (const docente of listaDocentes) {
//   console.log(docente.toJSON());
// }

// console.log("Docentes consultados.");
