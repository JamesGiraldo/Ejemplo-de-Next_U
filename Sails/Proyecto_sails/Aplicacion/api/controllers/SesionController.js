/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  
    iniciar:async function(ped,res){

        res.view("pages/public/iniciar");
        

    },

    procesar_inicio:async function(ped,res){

        var usuario_bloqueado = await Cliente.find({email:ped.body.email,contraseña:ped.body.contrasena,estado:'bloqueado'});
        if(usuario_bloqueado.length > 0){
            ped.addFlash('error','Su usuario fue bloqueado temporalmente');
            return res.redirect("/iniciar");
        }


        var usuario = await Cliente.find({email:ped.body.email,contraseña:ped.body.contrasena});

        if(usuario.length > 0){
            var carrito=await Carrito.find({cliente:usuario[0].id}).populate("foto");
            var deseos=await Deseos.find({cliente:usuario[0].id}).populate("foto");

            ped.session.admin=undefined;
            ped.session.cliente=usuario;
            ped.session.carrito=carrito;
            ped.session.deseos=deseos;
            return res.redirect("/");
        }
        else{
            ped.addFlash('error','Email u contraseña incorrectos');
            return res.redirect("/iniciar");

        }

    },

    registro:async function(ped,res){

        res.view("pages/public/registro");

    },

    procesar_registro:async function(ped,res){
        var email = await Cliente.find({email:ped.body.email});
        var nombre = await Cliente.find({nombre:ped.body.nombre});


        if(email.length > 0){
            ped.addFlash('error','Este Email esta duplicado');
            return res.redirect("/registro");
        }
        else if(nombre.length > 0){
            ped.addFlash('error','Este Nombre ya se encuentra en uso');
            return res.redirect("/registro");
        }
        else{
            var registro= await Cliente.create({nombre:ped.body.nombre,email:ped.body.email,contraseña:ped.body.contrasena,estado:'activa'});
            var usuario = await Cliente.find({email:ped.body.email,contraseña:ped.body.contrasena});
            var carrito=await Carrito.find({cliente:usuario[0].id}).populate("foto")
            var deseos=await Deseos.find({cliente:usuario[0].id}).populate("foto");
            
            ped.addFlash('registrado','usted se a registrado correctamente');

            ped.session.admin=undefined;
            ped.session.cliente=usuario;
            ped.session.carrito=carrito;
            ped.session.deseos=deseos;
            return res.redirect("/");

        }




    },

    cerrar_sesion:async function(ped,res){
        ped.session.destroy();
        res.redirect("/")
    }

};

