const express = require('express')
const aplicacion = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('express-flash')

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_viajes'
});

aplicacion.use(bodyParser.json())
aplicacion.use(bodyParser.urlencoded({ extended: true }))
aplicacion.set('view engine', 'ejs')
aplicacion.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }))
aplicacion.use(flash())
aplicacion.use(express.static('public'))

aplicacion.use('/admin/', (req, res, next) => {
    if (!req.session.usuario) {
        req.flash('mensaje', 'Debe iniciar session')
        res.redirect('/inicio')
    }
})

aplicacion.get('/', (req, res) => {
    pool.getConnection(function(err, connection) {
        const consulta = `
        select titulo, resumen, fecha_hora, pseudonimo, votos
        from publicaciones INNER JOIN autores
        on publicaciones.autor_id = autores.id
        order by fecha_hora DESC
        limit 5
        `
        connection.query(consulta, (error, filas, campos) => {
            res.render('index', { publicaciones: filas })
        })
        connection.release()
    })
})

aplicacion.get('/registrarse', (req, res) => {
    res.render('registro', { mensaje: req.flash('mensaje') })
})

aplicacion.post('/procesar_registro', (req, res) => {
    pool.getConnection(function(err, connection) {
        const email = req.body.email.toLowerCase().trim()
        const pseudonimo = req.body.pseudonimo.trim()
        const contrasena = req.body.contrasena

        const consultaEmail = `
        select *
        from autores
        where email = ${connection.escape(email)}
        `
        connection.query(consultaEmail, (error, filas, campos) => {
            if (filas.length > 0) {
                req.flash('mensaje', 'Email duplicado')
                res.redirect('/registrarse')
            } else {
                const consultaPseudonimo = `
                select *
                from autores
                where pseudonimo = ${connection.escape(pseudonimo)}`

                connection.query(consultaPseudonimo, (error, filas, campos) => {
                    if (filas.length > 0) {
                        req.flash('mensaje', 'Pseudonimo duplicado')
                        res.redirect('/registrarse')
                    } else {
                        const consulta = `
                        insert into autores (email,contrasena,pseudonimo) values
                        (${connection.escape(email)},
                        ${connection.escape(contrasena)},
                        ${connection.escape(pseudonimo)})`

                        connection.query(consulta, (error, filas, campos) => {
                            req.flash('mensaje', 'Usuario Registrado')
                            res.redirect('/registrarse')
                        })
                    }
                })
            }
        })
        connection.release()
    })
})

aplicacion.get('/inicio', (req, res) => {
    res.render('iniciosesion', { mensaje: req.flash('mensaje') })
})

aplicacion.post('/procesar', (req, res) => {
    pool.getConnection(function(err, connection) {
        const consulta = `SELECT * FROM autores WHERE
        email = ${connection.escape(req.body.email)} AND contrasena = ${connection.escape(req.body.contrasena)}`

        connection.query(consulta, (error, filas, campos) => {
            if (filas.length > 0) {
                req.session.usuario = filas[0]
                res.redirect('/admin/index')
            } else {
                req.flash('mensaje', 'Datos Invalidos')
                res.redirect('/inicio')
            }
        })
        connection.release()
    })
})

aplicacion.get('/admin', (req, res) => {
    res.render('registro', { usuario: peticion.session.usuario, mensaje: peticion.flash('mensaje') })
})

aplicacion.listen(3000, function() {
    console.log('lista parce de una men')
})
