/**
 * PrincipalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  inicio: async (peticion, respuesta) =>
  {
    let fts;
    fts = await Fotos.find();
    respuesta.view ('pages/inicio',{fts});
  },
};

