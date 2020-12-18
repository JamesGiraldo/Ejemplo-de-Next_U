module.exports = {


  friendlyName: 'View inicio',


  description: 'Display "Inicio" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/inicio'
    }

  },


  fn: async function (inputs, exits) {
    const  cerrajeros = await Cerrajero.find().populate('empresa')
    return exits.success({cerrajeros});
  }


};
