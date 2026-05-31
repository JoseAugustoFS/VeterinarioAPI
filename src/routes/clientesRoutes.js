import express from "express";
import ClientesController from "../controllers/clientesController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
.get("/clientes", ClientesController.listarClientes, paginar)
.get("/clientes/:id", ClientesController.listarClientePorId)
.post("/clientes", ClientesController.cadastrarCliente)
.put("/clientes/:id", ClientesController.atualizarCliente)
.delete("/clientes/:id", ClientesController.excluirCliente);

export default router;