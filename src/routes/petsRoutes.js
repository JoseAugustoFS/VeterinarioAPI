import express from "express";
import PetsController from "../controllers/petsController.js";

const router = express.Router();

router
.get("/pets", PetsController.listarPets)
.get("/pets/:id", PetsController.listarPetPorId)
.post("/pets", PetsController.cadastrarPet)
.put("/pets/:id", PetsController.atualizarPet)
.delete("/pets/:id", PetsController.excluirPet);

export default router;