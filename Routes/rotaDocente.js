import { Router } from "express";
import docenteCTRL from "../Controllers/docenteCtrl.js";

const docenteRouter = Router();
const docenteCtrl = new docenteCTRL();
docenteRouter
  .get("/", docenteCtrl.consultar)
  .get("/:cpf", docenteCtrl.consultar) //dois tipos de get pois um é para pesquisas gerais e outro para pesquisa específica com parâmetro
  .post("/", docenteCtrl.gravar)
  .put("/:cpf", docenteCtrl.atualizar)
  .delete("/:cpf", docenteCtrl.excluir);

export default docenteRouter;
