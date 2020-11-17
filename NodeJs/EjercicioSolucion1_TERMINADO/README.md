# Mejorar detalle de autores

En este caso extendemos la consulta de autores y se forma una estructura `autores` que pueda manejarse en la vista.

```Javascript
router.get('/autores', (peticion, respuesta) => {
  pool.getConnection((err, connection) => {
    const consulta = `
      SELECT autores.id id, pseudonimo, avatar, publicaciones.id publicacion_id, titulo
      FROM autores
      INNER JOIN
      publicaciones
      ON
      autores.id = publicaciones.autor_id
      ORDER BY autores.id DESC, publicaciones.fecha_hora DESC
    `
    connection.query(consulta, (error, filas, campos) => {
      autores = []
      ultimoAutorId = undefined
      filas.forEach(registro => {
        if (registro.id != ultimoAutorId){
          ultimoAutorId = registro.id
          autores.push({
            id: registro.id,
            pseudonimo: registro.pseudonimo,
            avatar: registro.avatar,
            publicaciones: []
          })
        }
        autores[autores.length-1].publicaciones.push({
          id: registro.publicacion_id,
          titulo: registro.titulo
        })
      });
      respuesta.render('autores', { autores: autores })
    })
    connection.release()
  })
})
```

Luego se utiliza esa estructura en la vista

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Blog Viajes</title>
  <link rel="stylesheet" href="/stylesheets/estilos.css">
  <link rel="stylesheet" href="/stylesheets/mini-default.min.css">
</head>

<body>
  <% include ./partials/encabezado_publico %>

  <div class="container">
    <img src="images/fondo.jpg" width="100%">
    <h1>Autores</h1>

    <p>Conoce a nuestros autores:</p>

    <% autores.forEach(autor => { %>
      <div class="col-sm-12">
        <div class="card fluid ">
          <h3 class="section">
            <% if (autor.avatar && autor.avatar != "") { %>
              <img class="avatar" src="/avatars/<%=autor.avatar%>" />
              <% } else {
              %>
              <span class="icon-user"></span>
              <% } %>
            <%=autor.pseudonimo%>
          </h3>
          <ul>
            <% autor.publicaciones.forEach(publicacion => { %>
              <li><a href="/publicacion/<%=publicacion.id%>"><%=publicacion.titulo%></a></li>
            <% }) %>
          </ul>
        </div>
      </div>
      <% }) %>
    </div>
  </div>

  <% include ./partials/pie %>
  <script src="/javascripts/script.js"></script>
</body>

</html>
```
