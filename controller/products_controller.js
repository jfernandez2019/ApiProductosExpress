import { getConnection } from '../src/dbConfig.js'

export const viewAllProducts = async (req, res) => {
    try {
        const connection = await getConnection(); // Obtener la conexión a la base de datos
        try {
            const select_query = 'SELECT * FROM productos';
            const [rows, fields] = await connection.query(select_query); // Ejecutar la consulta
            connection.end(); // Cerrar la conexión
            res.status(200).json({ productos: rows });
        } catch (error) {
            console.error('No se pudo leer los productos', error);
            res.status(500).json({ mensaje: 'Error al leer todos los productos' });
        }
    } catch (error) {
        console.error('Error al obtener la conexión', error);
        res.status(500).json({ mensaje: 'Error al obtener la conexión a la base de datos' });
    }
};


export const createProduct = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { nombre, precio, descripcion } = req.body;
        // Hay que realizar el query para insertar un nuevo producto
        const insert_query = 'INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)';
        const connection = await getConnection(); // Obtener la conexión a la base de datos

        try {
            const [result] = await connection.query(insert_query, [nombre, precio, descripcion]); // Ejecutar la consulta
            connection.end(); // Cerrar la conexión

            res.status(200).json({ mensaje: 'El producto se ha creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el producto', error);
            res.status(500).json({ mensaje: 'Error al crear el producto' });
        }
    } catch (error) {
        console.error('Error al obtener la conexión', error);
        res.status(500).json({ mensaje: 'Error al obtener la conexión a la base de datos' });
    }
};

export const editOneProduct = async (req, res) => {
    //extraer los datos del cuerpo de la solicitud
    const { nombre, precio, descripcion } = req.body
    const { id } = req.params
    //query para actualizar un producto
    const update_query = 'UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?';
    const connection = await getConnection(); //Realizar la conexion a la base de datos
    try {
        //Ejecuta la query    
        const [result] = await connection.query(update_query, [nombre, precio, descripcion, id]);
        //cierra la conexion
        connection.end();

        if (result.affectedRows === 0) {
            //si no se actualizo ninguna linea es por que el id que ingresamos no existe
            return res.status(404).json({ mensaje: "No se encontro id del producto a actualizar" })
        }
        return res.status(200).json({ "mensaje": `Producto nro ${id} fue actualizado` })

    } catch (error) {
        console.error('Error al actualizar el producto');
        res.status(500).json({ "mensaje": "Error al actualizar el producto" })
    }
}

export const deleteOneProducts = async (req, res) => {
    //extraer todos los datos del req
    const { id } = req.params
    //Realizar query delete para un producto
    const delete_query = 'DELETE FROM productos WHERE id = ?';
    //Realizar la conexion a la base de datos
    const connection = await getConnection();
    try {
        //Ejecuta la query
        const [result] = await connection.query(delete_query, [id]);
        //cerrar la conexion
        connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ "mensaje": "No se encontro id de producto para eliminar" })
        }

        return res.status(200).json({ "mensaje": "Producto eliminado con exito" })
    } catch (error) {
        console.error('Producto no pudo ser eliminado', error);
        res.status(500).json({ "mensaje": "Error al eliminar el producto" })
    }

}
