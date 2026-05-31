import express from "express";
import PetsController from "../controllers/petsController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
.get("/pets", PetsController.listarPets, paginar)
.get("/pets/busca", PetsController.listarPetsPorFiltro, paginar)
.get("/pets/:id", PetsController.listarPetPorId)
.post("/pets", PetsController.cadastrarPet)
.put("/pets/:id", PetsController.atualizarPet)
.delete("/pets/:id", PetsController.excluirPet);

export default router;