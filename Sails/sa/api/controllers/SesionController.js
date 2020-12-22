/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Carrocompra = require('../models/Carrocompra');

module.exports = {
  registro: async (peticion, respuesta) =>
  {
    let fotos = await Fotos.find();

    respuesta.view ('pages/registro', {fts: fotos});
  },

  procesarRegistro: async (peticion,respuesta) =>
  {
    // eslint-disable-next-line indent
     let cliente;

    cliente = await Usuarios.findOne ({email: peticion.body.email});

    if (cliente)
    {
      peticion.addFlash ('mensaje', 'e-mail ya registrado');
      respuesta.redirect ('/registro');
    }
    else
    {
      cliente = await Usuarios.create(
          {
            email: peticion.body.email,
            contrasena: peticion.body.contrasena,
            nombre: peticion.body.nombre,
          });
      respuesta.redirect ('/inicio');
    }
  },

  inicioSesion: async (peticion, respuesta) =>
  {
    respuesta.view ('pages/inicio_sesion');
  },

  procesarInicioSesion: async (pet,res) =>
  {
    let cliente;
    let carroCompra;
    cliente = await Usuarios.findOne ({email: pet.body.email, contrasena: pet.body.contrasena});

    if (cliente)
    {
      pet.session.cliente=cliente;
      carroCompra = await Carrocompra.find({usuarios: cliente.id});
      if (carroCompra)
      {
        pet.session.carrocompra = carroCompra;
      }
      res.redirect ('/inicio');
    }
    else
    {
      pet.addFlash ('mensaje', 'e-mail o contraseña inválido');
      res.redirect ('/inicio-sesion');
    }
  }

};

