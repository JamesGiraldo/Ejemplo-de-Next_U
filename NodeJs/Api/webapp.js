const express = require('express')
const aplicacion = express()
const mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_viajes'
})

aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: false }));

//GET /api/v1/publicaciones	JSON con todas las publicaciones.
//GET /api/v1/publicaciones?busqueda=<palabra>	JSON con todas las publicaciones que tengan la palabra <palabra> en el título, contenido o resumen.
aplicacion.get('/api/v1/publicaciones', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {
        let query;
        const busqueda = (peticion.query.busqueda) ? peticion.query.busqueda : ""
        if (busqueda == "") {
            query = `SELECT * FROM publicaciones`
        } else {
            query = `SELECT * FROM publicaciones WHERE titulo LIKE '%${busqueda}%' OR resumen LIKE '%${busqueda}%' OR contenido LIKE '%${busqueda}%' `
        }
        connection.query(query, function(error, filas) {
            if (filas.length > 0) {
                respuesta.json({
                    ok: true,
                    data: filas
                })
            } else {
                respuesta.status(404).send({
                    ok: false,
                    errors: ["No se encuentra esa publicacion"]
                })
            }
        })
        connection.release()
    })
})

//GET /api/v1/publicaciones/<id>	Publicación con id = <id>. Considera cuando el id no existe.
aplicacion.get('/api/v1/publicaciones/:id', function(peticion, respuesta) {

    const id = peticion.params.id
    pool.getConnection(function(err, connection) {
        const query = `SELECT * FROM publicaciones WHERE id=${connection.escape( id )}`
        connection.query(query, function(error, filas) {
            if (filas.length > 0) {
                respuesta.json({
                    ok: true,
                    data: filas[0]
                })
            } else {
                respuesta.status(404).send({
                    ok: false,
                    errors: ["No se encuentra esa publicacion"]
                })
            }
        })
        connection.release()
    })
})

//GET /api/v1/autores	JSON con todos los autores.
aplicacion.get('/api/v1/autores', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {

        const query = `SELECT * FROM autores`
        connection.query(query, function(error, filas) {
            respuesta.json({
                ok: true,
                data: filas
            })
        })
        connection.release()
    })
})

//GET /api/v1/autores/<id>	JSON con la información del autor con id = <id> y este contiene sus publicaciones. Considera cuando el id no existe.
aplicacion.get('/api/v1/autores/:id', function(peticion, respuesta) {

    const id = peticion.params.id;
    pool.getConnection(function(err, connection) {
        const query = `SELECT * FROM autores INNER JOIN publicaciones ON autores.id = publicaciones.autor_id Where autores.id = ${connection.escape( id )}`
        connection.query(query, function(error, filas) {
            if (filas.length > 0) {
                respuesta.json({
                    ok: true,
                    data: filas
                })
            } else {
                respuesta.status(404).send({
                    ok: false,
                    errors: ["No se encuentra ese autor"]
                })
            }
        })
        connection.release()
    })
})

//POST /api/v1/autores	Crea un autor dado un pseudónimo, email, contraseña. Validar peticiones con pseudónimos duplicados o email duplicados. Devuelve un JSON con el objeto creado.
aplicacion.post('/api/v1/autores', function(peticion, respuesta) {
    pool.getConnection((err, connection) => {
        const email = peticion.body.email.toLowerCase().trim()
        const pseudonimo = peticion.body.pseudonimo.trim()
        const contrasena = peticion.body.contrasena
        const consultaEmail = `SELECT *  FROM autores WHERE email = ${connection.escape(email)} `;
        connection.query(consultaEmail, (error, filas) => {
            if (filas.length > 0) {
                respuesta.status(404).send({
                    ok: false,
                    errors: ["Email duplicado"]
                })
            } else {
                const consultaPseudonimo = `SELECT * FROM autores WHERE pseudonimo = ${connection.escape(pseudonimo)} `
                connection.query(consultaPseudonimo, (error, filas) => {
                    if (filas.length > 0) {
                        respuesta.status(404).send({
                            ok: false,
                            errors: ["psudonimo duplicado"]
                        })
                    } else {
                        const consulta = `INSERT INTO autores (email, contraseña, pseudonimo) VALUES (
                                        ${connection.escape(email)},
                                        ${connection.escape(contrasena)},
                                        ${connection.escape(pseudonimo)} )`;
                        connection.query(consulta, (error, filas) => {
                            const nuevoId = filas.insertId
                            const queryConsulta = `SELECT * FROM autores WHERE id=${connection.escape(nuevoId)}`
                            connection.query(queryConsulta, function(error, filas) {
                                respuesta.status(200).json({
                                    ok: true,
                                    data: filas[0]
                                })
                            })
                        })
                    }
                })
            }
        })
        connection.release()
    })
})

//POST /api/v1/publicaciones?email=<email>&contrasena=<contrasena>	Crea una publicación para el usuario con <email> = email,si este se puede validar correctamente con la contraseña. Se le envía un título, resumen y contenido. Devuelve un JSON con el objeto creado.
aplicacion.post('/api/v1/publicaciones', function(peticion, respuesta) {

    /** Valores del query  */
    const email = peticion.query.email;
    const contrasena = peticion.query.contrasena;

    /** valores del body  */
    const titulo = peticion.body.titulo;
    const resumen = peticion.body.resumen;
    const contenido = peticion.body.contenido;

    /** impirmir los campos campos que recibe la petición  */
    console.log(email, contrasena,titulo, resumen, contenido);

    /** realizar la conexión  */
    pool.getConnection((err, connection) => {
        /** fecha */
        const date = new Date();
        const fecha = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        /** query que consulta los datos del autor correspondiente a los datos de preticion.query */
        const query = `SELECT * FROM autores  WHERE email = ${connection.escape(email)} AND contraseña = ${connection.escape(contrasena)}`;

        connection.query(query, (error, filas) => {
            /** validar si el resultado de peticón es mayor a 0 realiza el insert */
            if (filas.length > 0 ) {
                /** te toma el usuario que trae la petición en las filas en la poción inicial */
                const usuario = filas[0]
                /** el query de inserción */
                const consulta = `INSERT INTO publicaciones (titulo, resumen, contenido, autor_id, fecha_hora) VALUES (
                                    ${connection.escape(titulo)},
                                    ${connection.escape(resumen)},
                                    ${connection.escape(contenido)},
                                    ${connection.escape(usuario.id)},
                                    ${connection.escape(fecha)} ) `;
                connection.query(consulta, (error, filas) => {
                    const nuevoId = filas.insertId
                    const queryConsulta = `SELECT * FROM publicaciones WHERE id=${ connection.escape(nuevoId) }`
                    connection.query(queryConsulta, function(error, filas) {
                        /** en caso tal de que los datos del query sean correctos, tanto email como contraseña responder con los datos insertados */
                        respuesta.status(200).json({
                            ok: true,
                            data: filas[0]
                        })
                    })
                })
            } else {
                /** en caso tal de que los datos del query sean incorrectos, tanto email como contraseña */
                respuesta.status(404).send({
                    ok: false,
                    error: ["Email o contraseña errónea"]
                })
            }
        })
        connection.release()
    })
})

//DELETE /api/v1/publicaciones/<id>?email=<email>&contrasena=<contrasena>	Elimina la publicación si las credenciales son correctas y la publicación le pertenece al usuario.
aplicacion.delete('/api/v1/publicaciones/:id', function(peticion, respuesta) {

    /** Valores del query  */
    const email = peticion.query.email.toLowerCase().trim()
    const contrasena = peticion.query.contrasena

    /** parametro que recibe la ruta para tomar el id correspondiente a la publicación a eliminar :id */
    const id = peticion.params.id

    /** realizar la conexión  */
    pool.getConnection((err, connection) => {
        /** query que consulta los datos del autor correspondiente a los datos de preticion.query */
        const query = `SELECT * FROM autores WHERE email = ${connection.escape(email)} AND contraseña = ${connection.escape(contrasena)} `
        connection.query(query, (error, filas) => {
            /** validar si el resultado de peticón es mayor a 0 realiza la acción  */
            if (filas.length > 0) {
                /** te toma el usuario que trae la petición en las filas en la poción inicial */
                const autor = filas[0]
                /** el query que consulta las Publicaciones correspondientes al autor */
                const publicUsuario = `SELECT * FROM publicaciones WHERE id = ${connection.escape(id)} AND autor_id = ${connection.escape(autor.id)} `;

                connection.query(publicUsuario, (error, filas) => {
                    if (filas.length > 0) {
                        const ConsultaDelete = `DELETE FROM publicaciones WHERE id = ${connection.escape(id)} AND autor_id = ${connection.escape(autor.id)}`
                        connection.query(ConsultaDelete, (error, filas) => {
                            /** en caso tal de que los datos del query sean correctos, tanto email como contraseña responder con un mensaje ok  */
                            respuesta.status(200).json({
                                ok: true,
                                menssaje: "Publicación eliminada con éxito",
                            });
                        })
                    } else {
                        /** en caso tal de que los datos del parametro sean incorrecto, responder con un false */
                        respuesta.status(400).json({
                            ok: false,
                            errors: "La publicacion no existe o no pertenece al usuario"
                        })
                    }
                })
            } else {
                /** en caso tal de que los datos del query sean incorrectos, tanto email como contraseña responder con un mensaje false */
                respuesta.status(404).json({
                    ok: false,
                    errors: "Email o contraseña errónea"
                })
            }
        })
        connection.release()
    })
})

aplicacion.listen(5000, function() {
    console.log("Servidor iniciado")
})
