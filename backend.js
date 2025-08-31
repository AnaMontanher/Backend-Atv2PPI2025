import express from "express";

const hostname = "0.0.0.0";
const porta = 4000;

const app = express();

app.listen(porta, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${porta}`);
});