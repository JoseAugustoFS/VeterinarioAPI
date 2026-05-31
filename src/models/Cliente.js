import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema(
    {
        id: { type: String, },
        nome: { type: String, required: true },
        email: { type: String, required: true },
        telefone: { type: String},
        endereco: { type: String},
    },
    {
        versionKey: false
    }
);

const clientes = mongoose.model('cliente', clienteSchema);

export default clientes;
