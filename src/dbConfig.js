import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
//Inicializar variables de entorno
dotenv.config();

//Creamos el get connection que nos permitira usar estos datos en el index
//es de tipo asyncrona la funcion 
export const getConnection = async () => {
    try {
        const db = {
            host: process.env.DB_HOST,
            user: process.env.USER_DB,
            password: process.env.PASSWORD_DB,
            database: process.env.DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
        };
        const connection = await mysql.createConnection(db)
        console.log('Conexion establecida')
        //Despues de crear la funcion no olvidar retornar la conexion
        return connection
    } catch (error) {
        console.log('Error al retornar la base de datos', error)
        throw error;
    }
}