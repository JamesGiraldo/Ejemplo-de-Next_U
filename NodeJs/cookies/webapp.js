const express = require('express');
const aplicacion = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

aplicacion.use(cookieParser());

aplicacion.get('/', function(req, res) {
  res.cookie('nombre', req.query.nombre);
});

aplicacion.get('/leer', function(res, req) {
  // req.send(`Bienvenido: ${req.cookies['nombre']}`);
  res.send(`Bienvenido: ${req.cookies['nombre']}`);
})

aplicacion.listen(8080, function(){
  console.log("Servidor iniciado --> port 8080");
});
