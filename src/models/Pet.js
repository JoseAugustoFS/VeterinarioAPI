import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
    {
        id: { type: String, },
        nome: { type: String, required: [true, "O nome é obrigatório"] },
        especie: { type: String, required: [true, "A espécie é obrigatória"] },
        raca: { type: String},
        idade: { type: Number},
        cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente', required: [true, "O cliente é obrigatório"] },
    },
    {
        versionKey: false
    }
);

const pets = mongoose.model('pet', petSchema);

export default pets;