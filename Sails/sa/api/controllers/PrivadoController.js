/**
 * PrivadoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  salir: async (peticion, respuesta) =>
  {
    peticion.session.cliente = undefined;
    respuesta.redirect ('/inicio');
  },

  inicioprivado: async (pet,res) =>
  {
    res.redirect ('/inicio');
  }

};

