import express from "express";
import ClientesController from "../controllers/clientesController.js";

const router = express.Router();

router
.get("/clientes", ClientesController.listarClientes)
.post("/clientes", ClientesController.cadastrarCliente);

export default router;