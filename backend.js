import express from "express";
import cursoRouter from "./Routes/rotaCurso.js";
import docenteRouter from "./Routes/rotaDocente.js";

const hostname = "0.0.0.0";
const porta = 4000;

const app = express();
//configurar o servidor para receber dados no formado json
app.use(express.json()); //camada que sabe tratar os dados no formato JSON

app.use("/curso", cursoRouter); //camada que sabe atender requisições endpoint curso

app.use("/docente", docenteRouter); //camada que sabe atender requisições endpoint docente

app.listen(porta, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${porta}`);
});
