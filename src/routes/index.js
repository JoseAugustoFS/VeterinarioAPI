import express from 'express';
import clientes from './clientesRoutes.js';
import pets from './petsRoutes.js';

const router = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'API Veterinário'});
    });

    app.use(
        express.json(),
        clientes,
        pets
    );
}

export default router;