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
})

aplicacion.use(bodyParser.json())
aplicacion.use(bodyParser.urlencoded({ extended: true }))
aplicacion.set("view engine", "ejs")
aplicacion.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }));
aplicacion.use(flash())
aplicacion.use(express.static('public'))

aplicacion.use('/admin/', (peticion, respuesta, siguiente) => {
  if (!peticion.session.usuario) {
    peticion.flash('mensaje', 'Debe iniciar sesión')
    respuesta.redirect("/inicio")
  }
  else {
    siguiente()
  }
})

aplicacion.get('/', function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const consulta = `
      SELECT
      titulo, resumen, fecha_hora, pseudonimo, votos
      FROM publicaciones
      INNER JOIN autores
      ON publicaciones.autor_id = autores.id
      ORDER BY fecha_hora DESC
      LIMIT 5
    `
    connection.query(consulta, function (error, filas, campos) {
      respuesta.render('index', { publicaciones: filas })
    })
    connection.release()
  })
})

aplicacion.get('/registro', function (peticion, respuesta) {
  respuesta.render('registro', { mensaje: peticion.flash('mensaje') })
})

aplicacion.post('/procesar_registro', function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {

    const email = peticion.body.email.toLowerCase().trim()
    const pseudonimo = peticion.body.pseudonimo.trim()
    const contrasena = peticion.body.contrasena

    const consultaEmail = `
      SELECT *
      FROM autores
      WHERE email = ${connection.escape(email)}
    `

    connection.query(consultaEmail, function (error, filas, campos) {
      if (filas.length > 0) {
        peticion.flash('mensaje', 'Email duplicado')
        respuesta.redirect('/registro')
      }
      else {

        const consultaPseudonimo = `
          SELECT *
          FROM autores
          WHERE pseudonimo = ${connection.escape(pseudonimo)}
        `

        connection.query(consultaPseudonimo, function (error, filas, campos) {
          if (filas.length > 0) {
            peticion.flash('mensaje', 'Pseudonimo duplicado')
            respuesta.redirect('/registro')
          }
          else {

            const consulta = `
                                INSERT INTO
                                autores
                                (email, contrasena, pseudonimo)
                                VALUES (
                                  ${connection.escape(email)},
                                  ${connection.escape(contrasena)},
                                  ${connection.escape(pseudonimo)}
                                )
                              `
            connection.query(consulta, function (error, filas, campos) {
              peticion.flash('mensaje', 'Usuario registrado')
              respuesta.redirect('/registro')
            })
          }
        })
      }
    })
    connection.release()
  })
})

aplicacion.get('/inicio', function (peticion, respuesta) {
  respuesta.render('inicio', { mensaje: peticion.flash('mensaje') })
})


aplicacion.post('/procesar_inicio', function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const consulta = `
      SELECT *
      FROM autores
      WHERE
      email = ${connection.escape(peticion.body.email)} AND
      contrasena = ${connection.escape(peticion.body.contrasena)}
    `
    connection.query(consulta, function (error, filas, campos) {
      if (filas.length > 0) {
        peticion.session.usuario = filas[0]
        respuesta.redirect('/admin/index')
      }
      else {
        peticion.flash('mensaje', 'Datos inválidos')
        respuesta.redirect('/inicio')
      }

    })
    connection.release()
  })
})


aplicacion.get('/admin/index', function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const consulta = `
      SELECT *
      FROM publicaciones
      WHERE
      autor_id = ${connection.escape(peticion.session.usuario.id)}
    `
    connection.query(consulta, function (error, filas, campos) {
      respuesta.render('admin/index', { usuario: peticion.session.usuario, mensaje: peticion.flash('mensaje'), publicaciones: filas })
    })
    connection.release()
  })
})

aplicacion.get('/procesar_cerrar_sesion', function (peticion, respuesta) {
  peticion.session.destroy();
  respuesta.redirect("/")
})

aplicacion.get('/admin/agregar', function (peticion, respuesta) {
  respuesta.render('admin/agregar', { mensaje: peticion.flash('mensaje') , usuario: peticion.session.usuario})
})

aplicacion.post('/admin/procesar_agregar', function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const date = new Date()
    // con este se valida que no imprima etiquetas html
    // var contenido = connection.escape(peticion.body.contenido)
    //     contenido = contenido.replace(/<[^>]+>n*/g, ""\;'')
    const fecha = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const consulta = `
      INSERT INTO
      publicaciones
      (titulo, resumen, contenido, autor_id, fecha_hora)
      VALUES
      (
        ${connection.escape(peticion.body.titulo)},
        ${connection.escape(peticion.body.resumen)},
        ${connection.escape(peticion.body.contenido)},
        ${connection.escape(peticion.session.usuario.id)},
        ${connection.escape(fecha)}
      )
    `
    connection.query(consulta, function (error, filas, campos) {
      peticion.flash('mensaje', 'Publicación agregada')
      respuesta.redirect("/admin/index")
    })
    connection.release()
  })
})

aplicacion.listen(8080, function () {
  console.log("Servidor iniciado")
})
