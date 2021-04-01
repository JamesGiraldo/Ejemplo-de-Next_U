const express = require('express')
const aplicacion = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_viajes'
})

aplicacion.use(bodyParser.json())
aplicacion.use(bodyParser.urlencoded({ extended: true }))

//GET /api/v1/publicaciones	JSON con todas las publicaciones.
//GET /api/v1/publicaciones?busqueda=<palabra>	JSON con todas las publicaciones que tengan la palabra <palabra> en el título, contenido o resumen.
aplicacion.get('/api/v1/publicaciones/', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {
        let query
        const busqueda = (peticion.query.busqueda) ? peticion.query.busqueda : ""
        if (busqueda == "") {
            query = `SELECT * FROM publicaciones`
        } else {
            query = ` SELECT * FROM publicaciones WHERE 
        titulo LIKE '%${busqueda}%' OR 
        resumen LIKE '%${busqueda}%' OR 
        contenido LIKE '%${busqueda}%'
        `
        }
        connection.query(query, function(error, filas, campos) {
            if (filas.length > 0) {
                respuesta.json({ data: filas })
            } else {
                respuesta.status(404)
                respuesta.send({ errors: ["No se encuentra esa publicacion"] })
            }
        })
        connection.release()
    })
})

//GET /api/v1/publicaciones/<id>	Publicación con id = <id>. Considera cuando el id no existe.
aplicacion.get('/api/v1/publicaciones/:id', function(peticion, respuesta) {

    pool.getConnection(function(err, connection) {

        const query = `SELECT * FROM publicaciones WHERE id=${connection.escape(peticion.params.id)}`
        connection.query(query, function(error, filas, campos) {
            if (filas.length > 0) {
                respuesta.json({ data: filas[0] })
            } else {
                respuesta.status(404)
                respuesta.send({ errors: ["No se encuentra esa publicacion"] })
            }

        })
        connection.release()
    })
})

//GET /api/v1/autores	JSON con todos los autores.
aplicacion.get('/api/v1/autores', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {

        const query = `SELECT * FROM autores`
        connection.query(query, function(error, filas, campos) {
            respuesta.json({ data: filas })
        })
        connection.release()
    })
})

//GET /api/v1/autores/<id>	JSON con la información del autor con id = <id> y este contiene sus publicaciones. Considera cuando el id no existe.
aplicacion.get('/api/v1/autores/:id', function(peticion, respuesta) {

    pool.getConnection(function(err, connection) {
        const query = `
        SELECT *
        FROM autores
        INNER JOIN
        publicaciones
        ON
        autores.id = publicaciones.autor_id
        Where autores.id = ${connection.escape(peticion.params.id)}
      `
        connection.query(query, function(error, filas, campos) {
            if (filas.length > 0) {
                respuesta.json({ data: filas })
            } else {
                respuesta.status(404)
                respuesta.send({ errors: ["No se encuentra ese autor"] })
            }
        })
        connection.release()
    })
})

//POST /api/v1/autores	Crea un autor dado un pseudónimo, email, contraseña. Validar peticiones con pseudónimos duplicados o email duplicados. Devuelve un JSON con el objeto creado.
aplicacion.post('/api/v1/autores/', function(peticion, respuesta) {
    pool.getConnection((err, connection) => {
        const email = peticion.body.email.toLowerCase().trim()
        const pseudonimo = peticion.body.pseudonimo.trim()
        const contrasena = peticion.body.contraseña
        const consultaEmail = `
          SELECT *
          FROM autores
          WHERE email = ${connection.escape(email)}
        `
        connection.query(consultaEmail, (error, filas, campos) => {
            if (filas.length > 0) {
                respuesta.status(404)
                respuesta.send({ errors: ["Email duplicado"] })
            } else {
                const consultaPseudonimo = `
              SELECT *
              FROM autores
              WHERE pseudonimo = ${connection.escape(pseudonimo)}
            `
                connection.query(consultaPseudonimo, (error, filas, campos) => {
                    if (filas.length > 0) {
                        respuesta.status(404)
                        respuesta.send({ errors: ["psudonimo duplicado"] })
                    } else {
                        const consulta = `
                                    INSERT INTO
                                    autores
                                    (email, contraseña, pseudonimo)
                                    VALUES (
                                      ${connection.escape(email)},
                                      ${connection.escape(contrasena)},
                                      ${connection.escape(pseudonimo)}
                                    )
                                  `
                                  console.log(consulta)
                        connection.query(consulta, (error, filas, campos) => {
                            const nuevoId = filas.insertId
                            const queryConsulta = `SELECT * FROM autores WHERE id=${connection.escape(nuevoId)}`
                            connection.query(queryConsulta, function(error, filas, campos) {
                                respuesta.status(201)
                                respuesta.json({ data: filas[0] })
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
aplicacion.post('/api/v1/publicaciones/', function(peticion, respuesta) {


    const email = peticion.query.email
    const contrasena = peticion.query.cont
    const titulo = peticion.body.titulo
    const resumen = peticion.body.resumen
    const contenido = peticion.body.contenido

    console.log(email, contrasena,titulo, resumen, contenido);

    pool.getConnection((err, connection) => {
     
        const date = new Date()
        const fecha = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        const consultaUsserPass = `
          SELECT *
          FROM autores
          WHERE
          email = ${connection.escape(email)} AND
          contrasena = ${connection.escape(contrasena)}
            `
        connection.query(consultaUsserPass, (error, filas, campos) => {
            console.log(campos)
            if (filas.length <= 0) {
                respuesta.status(404)
                respuesta.send({ errors: ["Usuario o clave erronea"] })
            } else {
                let usuario = filas[0]
                const consulta = `
                INSERT INTO
                publicaciones
                (titulo, resumen, contenido, autor_id, fecha_hora)
                VALUES (
                    ${connection.escape(titulo)},
                    ${connection.escape(resumen)},
                    ${connection.escape(contenido)},
                    ${connection.escape(usuario.id)},
                    ${connection.escape(fecha)}
                )
                `
                connection.query(consulta, (error, filas, campos) => {
                    const nuevoId = filas.insertId
                    const queryConsulta = `SELECT * FROM publicaciones WHERE id=${connection.escape(nuevoId)}`
                    connection.query(queryConsulta, function(error, filas, campos) {
                        respuesta.status(201)
                        respuesta.json({ data: filas[0] })
                    })

                })
            }
        })
        connection.release()
    })
})

//DELETE /api/v1/publicaciones/<id>?email=<email>&contrasena=<contrasena>	Elimina la publicación si las credenciales son correctas y la publicación le pertenece al usuario.
aplicacion.delete('/api/v1/publicaciones/:id', function(peticion, respuesta) {
    pool.getConnection((err, connection) => {
        const email = peticion.query.email.toLowerCase().trim()
        const contrasena = peticion.query.contraseña
        const id_publicacion = peticion.params.id
        const consultaUsserPass = `
          SELECT *
          FROM autores
          WHERE
          email = ${connection.escape(email)} AND
          contraseña = ${connection.escape(contrasena)}
            `
        connection.query(consultaUsserPass, (error, filas, campos) => {
            if (filas.length <= 0) {
                respuesta.status(404)
                respuesta.send({ errors: ["Usuario o clave erronea"] })
            } else {
                let usuario = filas[0]
                const consultaPublicacionUsuario = `
                SELECT *
                FROM
                publicaciones
                WHERE
                id = ${connection.escape(id_publicacion)}
                AND
                autor_id = ${connection.escape(usuario.id)}
                `
                connection.query(consultaPublicacionUsuario, (error, filas, campos) => {
                    if (filas.length <= 0) {
                        respuesta.status(404)
                        respuesta.send({ errors: ["La publicacion no existe o no pertenece al usuario"] })
                    } else {
                        const ConsultaDelete = `
                        Delete
                        FROM
                        publicaciones
                        WHERE
                        id = ${connection.escape(id_publicacion)}
                        AND
                        autor_id = ${connection.escape(usuario.id)}
                        `
                        connection.query(ConsultaDelete, (error, filas, campos) => {
                            respuesta.status(204)
                            respuesta.json()
                        })
                    }

                })
            }
        })
        connection.release()
    })
})

aplicacion.listen(5000, function() {
    console.log("Servidor iniciado")
})