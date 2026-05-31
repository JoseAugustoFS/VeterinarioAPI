import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
    {
        id: { type: String, },
        nome: { type: String, required: true },
        especie: { type: String, required: true },
        raca: { type: String},
        idade: { type: Number},
        cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente', required: true },
    },
    {
        versionKey: false
    }
);

const pets = mongoose.model('pet', petSchema);

export default pets;