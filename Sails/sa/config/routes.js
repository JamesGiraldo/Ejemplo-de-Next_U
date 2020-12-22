
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'GET /inicio': 'PrincipalController.inicio',
  'GET /registro': 'SesionController.registro',
  'POST /procesar-registro': 'SesionController.procesarRegistro',
  'GET /inicio-sesion': 'SesionController.inicioSesion',
  'POST /procesar-inicio': 'SesionController.procesarInicioSesion',
  'GET /salir': 'PrivadoController.salir',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
