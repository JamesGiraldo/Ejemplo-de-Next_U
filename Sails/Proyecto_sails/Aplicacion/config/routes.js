/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': "PublicController.inicio",
  'GET /top_vendidas': "PublicController.top_vendidas",
  'GET /acerca': "PublicController.acerca",


  'GET /iniciar': "SesionController.iniciar",
  'GET /registro':"SesionController.registro",

  'POST /procesar_inicio': "SesionController.procesar_inicio",
  'POST /procesar_registro':"SesionController.procesar_registro",

  'GET /cerrar_sesion':"SesionController.cerrar_sesion",


  'GET /mi_carrito':"PrivatedController.mi_carrito",
  'GET /agregar_carrito':"PrivatedController.agregar_carrito",
  'GET /eliminar_foto':"PrivatedController.eliminar_foto",

  'GET /mi_deseos':"PrivatedController.mi_deseos",
  'GET /agregar_deseos':"PrivatedController.agregar_deseos",
  'GET /eliminar_deseos':"PrivatedController.eliminar_deseos",


  'GET /comprar':"PrivatedController.comprar",
  'GET /mis_ordenes':"PrivatedController.mis_ordenes",
  'GET /detalles/:fecha':"PrivatedController.detalles",





  'GET /admin/iniciar':"AdminController.iniciar",
  'POST /admin/procesar_iniciar':"AdminController.procesar_iniciar",

  'GET /admin/agregar_foto':"AdminController.agregar_foto",
  'POST /admin/procesar_agregar_foto':"AdminController.procesar_agregar_foto",
  
  'GET /admin/desabilitar_foto':"AdminController.desabilitar_foto",


  'GET /admin/':"AdminController.inicio",
  'GET /admin/clientes':"AdminController.informe_clientes",
  'GET /admin/desactivar_cliente':"AdminController.desactivar_cliente",
  'GET /admin/ordenes_cliente':"AdminController.ordenes_cliente",
  'GET /admin/orden_detalles/:id/:fecha':"AdminController.orden_detalles",

  'GET /admin/admins':"AdminController.informe_admins",
  'GET /admin/desactivar_admin':"AdminController.desactivar_admin",


  'GET /admin/dashboard':"AdminController.informe_dashboard",

















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
