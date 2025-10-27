
import express from "express";
import dotenv from "dotenv";
import bruxoRoutes from './src/routes/bruxoRoutes.js';


const app = express();
app.use(express.json());


dotenv.config();
const serverPort = process.env.PORT || 3001;


app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});



app.use('/bruxos', bruxoRoutes);


app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});