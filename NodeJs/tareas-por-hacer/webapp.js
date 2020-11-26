const express = require('express')
const aplicacion = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tareas_app'
})

aplicacion.set('view engine', 'ejs')
aplicacion.use(bodyParser.json())
aplicacion.use(bodyParser.urlencoded({ extended: true }))


aplicacion.get('/', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {
        const query = `SELECT tareas.id AS id, tareas.descripcion, recursos.nombre FROM tareas INNER JOIN recursos ON tareas.id = recursos.tarea_id ORDER BY tareas.id`
        connection.query(query, function(error, filas, campos) {
            let tareas = []
            let tareaActual = {
                id: undefined
            }
            for (let i = 0; i < filas.length; i++) {
                if (tareaActual.id != filas[i].id) {
                    tareaActual = {
                        id: filas[i].id,
                        descripcion: filas[i].descripcion,
                        recursos: [filas[i].nombre]
                    }
                    tareas.push(tareaActual)
                } else {
                    tareaActual.recursos.push(filas[i].nombre)
                }
            }
            respuesta.render('index', { tareas: tareas })
        })
        connection.release()
    })
})

aplicacion.post('/agregar-tarea', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {
        const query = `INSERT INTO tareas (descripcion) VALUES (${connection.escape(peticion.body.descripcion)})`
        connection.query(query, function(error, filas, campos) {
            respuesta.redirect("/")
        })
        connection.release()
    })
})

aplicacion.get('/actualizar-formulario', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {
        const query = `SELECT * FROM tareas WHERE id = ${connection.escape(peticion.query.id)}`
        connection.query(query, function(error, filas, campos) {
            respuesta.render('actualizar', { tarea: filas[0] })
        })
        connection.release()
    })
})

aplicacion.post('/actualizar-tarea', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {
        const query = `UPDATE tareas SET descripcion=${connection.escape(peticion.body.descripcion)} WHERE id=${connection.escape(peticion.body.id)}`
        connection.query(query, function(error, filas, campos) {
            respuesta.redirect("/")
        })
        connection.release()
    })
})

aplicacion.get('/eliminar-tarea', function(peticion, respuesta) {
    pool.getConnection(function(err, connection) {
        const query = `DELETE FROM tareas WHERE id=${connection.escape(peticion.query.id)}`
        connection.query(query, function(error, filas, campos) {
            respuesta.redirect("/")
        })
        connection.release()
    })
})

aplicacion.listen(8080, function() {
    console.log("Servidor iniciado")
})
