const express = require('express')
const aplicacion = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


aplicacion.use(cookieParser())
aplicacion.use(bodyParser.json())
aplicacion.use(bodyParser.urlencoded({ extended: true }))
aplicacion.set("view engine", "ejs")



aplicacion.get('/', function (peticion, respuesta) {
  respuesta.cookie('nombre', peticion.query.nombre)
    return respuesta.send("Se creo correctamente el cookie")
  });

  aplicacion.get('/leer', function (peticion, respuesta) {
  var username =  peticion.cookies['nombre']
    if (username) {
      return respuesta.send(`Bienvenido, ${username}`);
  }
  return respuesta.send('No cookie found');
  });


  aplicacion.listen(8080, function () {
    console.log("Servidor iniciado en el puerto 8080")
  });


/** Otra posible solución :)  */

  // const express = require('express')
  // const aplicacion = express()
  // const bodyParser = require('body-parser')
  // const cookieParser = require('cookie-parser')
  //
  // aplicacion.use(cookieParser())
  // aplicacion.use(bodyParser.json())
  // aplicacion.use(bodyParser.urlencoded({ extended: true }))
  //
  //
  // aplicacion.get('/', function (req, res) {
  //   res.cookie('nombre', req.query.nombre)
  //     return res.send("Se creo correctamente el cookie")
  // });
  //
  // aplicacion.get('/leer', function (req, res) {
  //   res.send(`Bienvenido: ${req.cookies['nombre']}`);
  // });
  //
  // aplicacion.get('/salir', function (req, res) {
  //   res.redirect("/")
  // });
  //
  // aplicacion.listen(8080, function () {
  //   console.log("Servidor iniciado")
  // });
