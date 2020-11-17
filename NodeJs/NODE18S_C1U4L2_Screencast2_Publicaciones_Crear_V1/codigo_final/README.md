```Javascript

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


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Blog Viajes</title>
  <link rel="stylesheet" href="../stylesheets/estilos.css">
  <link rel="stylesheet" href="../stylesheets/mini-default.min.css">
</head>

<body>
  <% include ../partials/encabezado_privado %>

  <div class="container">
    <h1>Admin - Mis publicaciones</h1>
    <hr>

    <div class="row">

      <div class="col-sm-12">

        <% if (mensaje && mensaje.length > 0) { %>
        <h4><span class="icon-info"></span>
          <%=mensaje%>
        </h4>
        <% } %>

        <table>
          <thead>
            <tr>
              <th>titulo</th>
              <th>resumen</th>
              <th>votos</th>
            </tr>
          </thead>
          <tbody>
            <% publicaciones.forEach( (publicacion) => { %>
            <tr>
              <td>
                <%=publicacion.titulo%>
              </td>
              <td>
                <%=publicacion.resumen%>
              </td>
              <td>
                <%=publicacion.votos%>
              </td>
            </tr>
            <% }) %>
          </tbody>
        </table>

      </div>
    </div>

  </div>

  <% include ../partials/pie %>
  <script src="../javascripts/script.js"></script>
</body>

</html>




        <hr>
        <a class="button" href="/admin/agregar">Agregar Publicación</a>


aplicacion.get('/admin/agregar', function (peticion, respuesta) {
  respuesta.render('admin/agregar', { mensaje: peticion.flash('mensaje') , usuario: peticion.session.usuario})
})


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Blog Viajes</title>
  <link rel="stylesheet" href="../stylesheets/estilos.css">
  <link rel="stylesheet" href="../stylesheets/mini-default.min.css">

</head>

<body>
  <% include ../partials/encabezado_privado %>

  <div class="container">
    <h1>Admin - Agregar publicación</h1>
    <hr>

    <div class="row">

      <div class="col-sm-12">

        <% if (mensaje && mensaje.length > 0) { %>
        <h4><span class="icon-info"></span>
          <%=mensaje%>
        </h4>
        <% } %>

        <form action="/admin/procesar_agregar" method="POST">
          <fieldset>
            <legend>Datos de publicación</legend>
            <p>
              <label for="titulo">Título</label>
              <br>
              <input type="text" id="titulo" name="titulo" required="true" />
            </p>
            <p>
              <label for="resumen">Resumen</label>
              <br>
              <textarea id="resumen" name="resumen"></textarea>
            </p>
            <p>
              <label for="contenido">Contenido</label>
              <br>
              <textarea id="contenido" name="contenido"></textarea>
            </p>

            <p>
              <input class="primary" type="submit" value="Continuar" />
            </p>
          </fieldset>
        </form>



      </div>
    </div>

  </div>

  <% include ../partials/pie %>


  <script src="../javascripts/script.js"></script>
</body>

</html>






  <script src="../javascripts/ckeditor5-build-classic/ckeditor.js"></script>




          <script>
          ClassicEditor
            .create(document.querySelector('#contenido'), {
              toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
              heading: {
                options: [
                  { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                  { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                  { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                ]
              }
            })
            .catch(error => {
              console.error(error);
            });
        </script>



aplicacion.post('/admin/procesar_agregar', function (peticion, respuesta) {
  pool.getConnection(function (err, connection) {
    const date = new Date()
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


```
