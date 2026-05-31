import clientes from '../models/Cliente.js';

class ClientesController {
    static listarClientes = async (req, res) => {
        try{
            const clientesResultado = await clientes.find();
            res.status(200).json(clientesResultado);
        }
        catch(erro){
            res.status(500).json({ message: err.message });
        }
    }

    static listarClientePorId = async (req, res) => {
        try{
            const id = req.params.id;
            const clienteResultado = await clientes.findById(id);
            if(clienteResultado !== null){
                res.status(200).json(clienteResultado);
            }
            else{
                res.status(404).json({ message: "Cliente não encontrado" });
            }
        }
        catch(erro){
            res.status(500).json({ message: erro.message });
        }
    }

    static cadastrarCliente = async (req, res) => {
        try{
            const clienteResultado = new clientes(req.body);
            await clienteResultado.save();
            res.status(201).json(clienteResultado);
        }
        catch(erro){
            res.status(500).json({ message: erro.message });
        }
    };

    static atualizarCliente = async (req, res) => {
        try{
            const id = req.params.id;
            const clienteResultado = await clientes.findByIdAndUpdate(id, { $set: req.body });
            if(clienteResultado !== null){
                res.status(200).json({ message: "Cliente atualizado com sucesso" });
            }
            else{
                res.status(404).json({ message: "Cliente não encontrado" });
            }
        }
        catch(erro){
            res.status(500).json({ message: erro.message });
        }
    }

    static excluirCliente = async (req, res) => {
        try{
            const id = req.params.id;
            const clienteResultado = await clientes.findByIdAndDelete(id);
            if(clienteResultado !== null){
                res.status(200).json({ message: "Cliente excluído com sucesso" });
            }
            else{
                res.status(404).json({ message: "Cliente não encontrado" });
            }
        }
        catch(erro){
            res.status(500).json({ message: erro.message });
        }
    }
}

export default ClientesController;