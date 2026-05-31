import { pets, clientes } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class PetsController {
    static listarPets = async (req, res, next) => {
        try{
            const petsResultado = pets.find().populate('cliente');
            
            req.resultado = petsResultado;
            next();
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
                next(new NaoEncontrado("Pet não encontrado"));
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
                next(new NaoEncontrado("Pet não encontrado"));
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
                next(new NaoEncontrado("Pet não encontrado"));
            }
        }
        catch(erro){
            next(erro);
        }
    }

    static listarPetsPorFiltro = async (req, res, next) => {
        try{
            const busca = await processaBusca(req.query);
            
            if(busca !== null){
                const petsResultado = pets.find(busca).populate('cliente');
                
                req.resultado = petsResultado;
                next();
            }
            else{
                res.status(200).send([]);
            }
        }
        catch(erro){
            next(erro);
        }
    }
}

async function processaBusca(parametros){
    const busca = {};
    const { nome, especie, minIdade, maxIdade, raca, dono } = parametros;

    if(nome){
        busca.nome = { $regex: nome, $options: "i" };
    }

    if(especie){
        busca.especie = { $regex: especie, $options: "i" };
    }

    if(raca){
        busca.raca = { $regex: raca, $options: "i" };
    }

    if(minIdade || maxIdade){
        busca.idade = {};
    }

    if(minIdade){
        busca.idade.$gte = minIdade;
    }

    if(maxIdade){
        busca.idade.$lte = maxIdade;
    }

    if(dono){
        const clienteResultado = await clientes.findOne({ nome: { $regex: dono, $options: "i" } });
        if(clienteResultado !== null){
            busca.cliente = clienteResultado._id;
        }
        else{
            return null;
        }
    }

    return busca;
}

export default PetsController;