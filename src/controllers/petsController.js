import { pets } from "../models/index.js";

class PetsController {
    static listarPets = async (req, res) => {
        try{
            const petsResultado = await pets.find().populate('cliente');
            res.status(200).json(petsResultado);
        }
        catch(erro){
            res.status(500).json({ message: erro.message });
        }
    }

    static listarPetPorId = async (req, res) => {
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
            res.status(500).json({ message: erro.message });
        }
    }

    static cadastrarPet = async (req, res) => {
        try{
            const petResultado = new pets(req.body);
            await petResultado.save();
            res.status(201).json(petResultado);
        }
        catch(erro){
            res.status(500).json({ message: erro.message });
        }
    };

    static atualizarPet = async (req, res) => {
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
            res.status(500).json({ message: erro.message });
        }
    }

    static excluirPet = async (req, res) => {
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
            res.status(500).json({ message: erro.message });
        }
    }
}

export default PetsController;