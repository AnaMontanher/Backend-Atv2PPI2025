import { Router } from "express";
import cursoCTRL from "../Controllers/cursoCtrl.js";

const cursoRouter = Router();
const cursoCtrl = new cursoCTRL();
cursoRouter
  .get("/", cursoCtrl.consultar)
  .get("/:id", cursoCtrl.consultar) //dois tipos de get pois um é para pesquisas gerais e outro para pesquisa específica com parâmetro
  .post("/", cursoCtrl.gravar)
  .put("/:id", cursoCtrl.atualizar)
  .delete("/:id", cursoCtrl.excluir);

export default cursoRouter;
