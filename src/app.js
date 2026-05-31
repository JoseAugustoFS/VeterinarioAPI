import express from "express";
import db from "./config/dbConnect.js";
import clientesRoutes from "./routes/clientiesRoutes.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});


const app = express();
app.use(express.json());
app.use(clientesRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;