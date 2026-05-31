import { clientes } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class ClientesController {
    static listarClientes = async (req, res, next) => {
        try{
            const clientesResultado = clientes.find();

            req.resultado = clientesResultado;
            next();
        }
        catch(erro){
            next(erro);
        }
    }

    static listarClientePorId = async (req, res, next) => {
        try{
            const id = req.params.id;
            const clienteResultado = await clientes.findById(id);
            if(clienteResultado !== null){
                res.status(200).json(clienteResultado);
            }
            else{
                next(new NaoEncontrado("Cliente não encontrado"));
            }
        }
        catch(erro){
            next(erro);
        }
    }

    static cadastrarCliente = async (req, res, next) => {
        try{
            const clienteResultado = new clientes(req.body);
            await clienteResultado.save();
            res.status(201).json(clienteResultado);
        }
        catch(erro){
            next(erro);
        }
    };

    static atualizarCliente = async (req, res, next) => {
        try{
            const id = req.params.id;
            const clienteResultado = await clientes.findByIdAndUpdate(id, { $set: req.body });
            if(clienteResultado !== null){
                res.status(200).json({ message: "Cliente atualizado com sucesso" });
            }
            else{
                next(new NaoEncontrado("Cliente não encontrado"));
            }
        }
        catch(erro){
            next(erro);
        }
    }

    static excluirCliente = async (req, res, next) => {
        try{
            const id = req.params.id;
            const clienteResultado = await clientes.findByIdAndDelete(id);
            if(clienteResultado !== null){
                res.status(200).json({ message: "Cliente excluído com sucesso" });
            }
            else{
                next(new NaoEncontrado("Cliente não encontrado"));
            }
        }
        catch(erro){
            next(erro);
        }
    }

    static listarClientesPorFiltro = async (req, res, next) => {
        try{
            const busca = await processaBusca(req.query);
            
            if(busca !== null){
                const clientesResultado = clientes.find(busca);

                req.resultado = clientesResultado;
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
    const {nome, email, telefone, endereco} = parametros;

    let busca = {};

    if(nome){
        busca.nome = { $regex: nome, $options: "i" };
    }

    if(email){
        busca.email = { $regex: email, $options: "i" };
    }

    if(telefone){
        busca.telefone = { $regex: telefone, $options: "i" };
    }

    if(endereco){
        busca.endereco = { $regex: endereco, $options: "i" };
    }

    return busca;
}

export default ClientesController;