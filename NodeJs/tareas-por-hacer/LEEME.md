```Javascript

<li><a href="/actualizar-formulario?id=<%=tareas[i].id%>"><%=tareas[i].descripcion%></a></li>

// Crear archivo actualizar.ejs

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Ejemplo</title>
</head>
<body>
  <h1>Actualizar Tareas</h1>

  <form action="/actualizar-tarea" method="POST">
    <p>
    <label for="descripcion">Nueva Tarea: </label>
    <input type="text" name="descripcion">
    <button type="submit">Actualizar</button>
    </p>
  </form>

</body>
</html>





aplicacion.get('/actualizar-formulario', function (peticion, respuesta) {

  pool.getConnection(function(err, connection) {

    

  })

})

const query = `SELECT * FROM tareas WHERE id = ${connection.escape(peticion.query.id)}`

connection.query(query, function (error, filas, campos) {
  
})
connection.release()

respuesta.render('actualizar', {tarea: filas[0]})

<input type="text" name="descripcion" value="<%=tarea.descripcion%>">

<input type="hidden" name="id" value="<%=tarea.id%>">

aplicacion.post('/actualizar-tarea', function (peticion, respuesta) {

  pool.getConnection(function(err, connection) {



  })

})

const query = `UPDATE tareas SET descripcion=${connection.escape(peticion.body.descripcion)} WHERE id=${connection.escape(peticion.body.id)}`


connection.query(query, function (error, filas, campos) {
  respuesta.redirect("/")
})
connection.release()
 
```



