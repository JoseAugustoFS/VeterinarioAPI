import { pets } from "../models/index.js";

class PetsController {
    static listarPets = async (req, res, next) => {
        try{
            const petsResultado = await pets.find().populate('cliente');
            res.status(200).json(petsResultado);
        }
        catch(erro){
            next(erro);
        }
    }

    static listarPetPorId = async (req, res, next) => {
        try{
            const id = req.params.id;
            const petResultado = await pets.findById(id).populate('cliente')
            .populate("cliente", ["nome","email"])
            .exec();
            if(petResultado !== null){
                res.status(200).json(petResultado);
            }
            else{
                res.status(404).json({ message: "Pet não encontrado" });
            }
        }
        catch(erro){
            next(erro);
        }
    }

    static cadastrarPet = async (req, res, next) => {
        try{
            const petResultado = new pets(req.body);
            await petResultado.save();
            res.status(201).json(petResultado);
        }
        catch(erro){
            next(erro);
        }
    };

    static atualizarPet = async (req, res, next) => {
        try{
            const id = req.params.id;
            const petResultado = await pets.findByIdAndUpdate(id, { $set: req.body });
            if(petResultado !== null){
                res.status(200).json({ message: "Pet atualizado com sucesso" });
            }
            else{
                res.status(404).json({ message: "Pet não encontrado" });
            }
        }
        catch(erro){
            next(erro);
        }
    }

    static excluirPet = async (req, res, next) => {
        try{
            const id = req.params.id;
            const petResultado = await pets.findByIdAndDelete(id);
            if(petResultado !== null){
                res.status(200).json({ message: "Pet excluído com sucesso" });
            }
            else{
                res.status(404).json({ message: "Pet não encontrado" });
            }
        }
        catch(erro){
            next(erro);
        }
    }
}

export default PetsController;