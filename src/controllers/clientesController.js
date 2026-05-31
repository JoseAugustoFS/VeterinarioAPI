import clientes from '../models/Cliente.js';

class ClientesController {
    static listarClientes = async (req, res) => {
        try{
            const clientesResultado = await clientes.find();
            res.status(200).json(clientesResultado);
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }

    static cadastrarCliente = async (req, res) => {
        try{
            const clienteResultado = new clientes(req.body);
            await clienteResultado.save();
            res.status(201).json(clienteResultado);
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    };
}

export default ClientesController;