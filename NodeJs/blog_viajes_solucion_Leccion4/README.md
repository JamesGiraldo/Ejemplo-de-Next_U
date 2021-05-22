```Javascript

<mark class="tag">
            <%=publicacion.votos%></mark>


<a class="button small primary" href="/publicacion/<%=publicacion.id%>/votar">+ 1</a>


router.get('/publicacion/:id/votar', (peticion, respuesta) => {
  pool.getConnection((err, connection) => {
    const consulta = `
      SELECT *
      FROM publicaciones
      WHERE id = ${connection.escape(peticion.params.id)}
    `
    connection.query(consulta, (error, filas, campos) => {
      if (filas.length > 0) {
        


      }
      else {
        peticion.flash('mensaje', 'Publicación inválida')
        respuesta.redirect('/')
      }
    })
    connection.release()
  })
})


const consultaVoto = `
          UPDATE publicaciones
          SET
          votos = votos + 1
          WHERE id = ${connection.escape(peticion.params.id)}
        `
        connection.query(consultaVoto, (error, filas, campos) => {
          respuesta.redirect(`/publicacion/${peticion.params.id}`)
        })

npm install nodemailer --save

const nodemailer = require('nodemailer')




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cuenta.de.prueba.correo.1234@gmail.com',
    pass: 'Cuenta!123'
  }
})




function enviarCorreoBienvenida(email, nombre){
  const opciones = {
    from: 'cuenta.de.prueba.correo.1234@gmail.com',
    to: email,
    subject: 'Bienvenido al blog de viajes',
    text: `Hola ${nombre}`
  }
  transporter.sendMail(opciones, (error, info) => {
  });
}


enviarCorreoBienvenida(email, pseudonimo)

```
