import express from 'express';
import dotenv from 'dotenv';
import routes from '../routes/routes.js'
//Usar mysql con una unica conexion
//para usar un pool de conexiones se usar createPool
//importar variables de entorno
const host = process.env.HOSTNAME;
const port = process.env.PORT;
//Inicializar variables de entorno 
dotenv.config();

//inicializar express
const app = express();

//Usar middleware de express para pasar el req a json
app.use(express.json());
app.use(routes);

//Inicializar servidor
app.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);
});


