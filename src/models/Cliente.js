import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema(
    {
        id: { type: String, },
        nome: { type: String, required: [true, "O nome é obrigatório"] },
        email: { type: String, required: [true, "O email é obrigatório"] },
        telefone: { type: String},
        endereco: { type: String},
    },
    {
        versionKey: false
    }
);

const clientes = mongoose.model('cliente', clienteSchema);

export default clientes;
