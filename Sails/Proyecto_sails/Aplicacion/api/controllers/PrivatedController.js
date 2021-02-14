/**
 * PrivatedController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    
    mi_carrito:async function(ped,res){

        if(ped.session && ped.session.cliente){
            res.view("pages/private/carrito.ejs")
        }else{
            res.redirect("/iniciar")
        }
    },

    agregar_carrito:async function(ped,res){

        if(ped.session && ped.session.cliente){
            var foto= await Foto.find({id:ped.query.foto});
            
            if(foto.length > 0){
                var query=`select * from carrito where cliente_id =${ped.session.cliente[0].id} and foto_id=${foto[0].id};                `
                var foto_busqueda =await sails.sendNativeQuery(query);

                    if(foto_busqueda.rowCount == 0){
                        var query=`insert into carrito(cliente_id,foto_id)values(${ped.session.cliente[0].id},${foto[0].id})`
                        var insertar =await sails.sendNativeQuery(query);

                        var carrito=await Carrito.find({cliente:ped.session.cliente[0].id}).populate("foto");
                        ped.session.carrito=carrito;


                        ped.addFlash("mensaje",`Se a añadido la foto ${foto[0].titulo} a su carrito`)
                        res.redirect("/");
                    }else{
                        var query=`delete from carrito where cliente_id=${ped.session.cliente[0].id} and foto_id =${foto[0].id}`
                        var eliminar =await sails.sendNativeQuery(query);

                        var carrito=await Carrito.find({cliente:ped.session.cliente[0].id}).populate("foto");
                        ped.session.carrito=carrito;

                        ped.addFlash("mensaje",`Se a eliminado la foto ${foto[0].titulo} de su carrito`)
                        res.redirect("/");
                    }



            }else{
                ped.addFlash("mensaje",`Foto no disponible para añadir al carrito`)
                res.redirect("/");
            }

        }else{
            res.redirect("/iniciar");
        }


    },

    eliminar_foto:async function(ped,res){

        if(ped.session && ped.session.cliente){
            var foto= await Foto.find({id:ped.query.foto});
            
            if(foto.length > 0){
                        var query=`delete from carrito where cliente_id=${ped.session.cliente[0].id} and foto_id =${foto[0].id}`
                        var eliminar =await sails.sendNativeQuery(query);

                        var carrito=await Carrito.find({cliente:ped.session.cliente[0].id}).populate("foto");
                        ped.session.carrito=carrito;

                        ped.addFlash("mensaje",`Se a eliminado la foto ${foto[0].titulo} de su carrito`)
                        res.redirect("/mi_carrito");
            }else{
                ped.addFlash("mensaje",`Foto no disponible para añadir al carrito`)
                res.redirect("/mi_carrito");
            }

        }else{
            res.redirect("/iniciar");
        }


    },



    mi_deseos:async function(ped,res){

        if(ped.session && ped.session.cliente){
            res.view("pages/private/deseos.ejs")
        }else{
            res.redirect("/iniciar")
        }
    },

    agregar_deseos:async function(ped,res){

        if(ped.session && ped.session.cliente){
            var foto= await Foto.find({id:ped.query.foto});
            
            if(foto.length > 0){
                var query=`select * from deseos where cliente_id =${ped.session.cliente[0].id} and foto_id=${foto[0].id};                `
                var foto_busqueda =await sails.sendNativeQuery(query);

                    if(foto_busqueda.rowCount == 0){
                        var query=`insert into deseos(cliente_id,foto_id)values(${ped.session.cliente[0].id},${foto[0].id})`
                        var insertar =await sails.sendNativeQuery(query);

                        var deseos=await Deseos.find({cliente:ped.session.cliente[0].id}).populate("foto");
                        ped.session.deseos=deseos;


                        ped.addFlash("mensaje",`Se a añadido la foto ${foto[0].titulo} a su lista de deseos`)
                        res.redirect("/");
                    }else{
                        var query=`delete from deseos where cliente_id=${ped.session.cliente[0].id} and foto_id =${foto[0].id}`
                        var eliminar =await sails.sendNativeQuery(query);

                        var deseos=await Deseos.find({cliente:ped.session.cliente[0].id}).populate("foto");
                        ped.session.deseos=deseos;

                        ped.addFlash("mensaje",`Se a eliminado la foto ${foto[0].titulo} de su lista de deseos`)
                        res.redirect("/");
                    }



            }else{
                ped.addFlash("mensaje",`Foto no disponible para añadir al su lista de deseos`)
                res.redirect("/");
            }

        }else{
            res.redirect("/iniciar");
        }


    },

    eliminar_deseos:async function(ped,res){

        if(ped.session && ped.session.cliente){
            var foto= await Foto.find({id:ped.query.foto});
            
            if(foto.length > 0){
                        var query=`delete from deseos where cliente_id=${ped.session.cliente[0].id} and foto_id =${foto[0].id}`
                        var eliminar =await sails.sendNativeQuery(query);

                        var deseos=await Deseos.find({cliente:ped.session.cliente[0].id}).populate("foto");
                        ped.session.deseos=deseos;

                        ped.addFlash("mensaje",`Se a eliminado la foto ${foto[0].titulo} de su lista de deseos`)
                        res.redirect("/mi_deseos");
            }else{
                ped.addFlash("mensaje",`Foto no disponible para añadir a su lista de deseos `)
                res.redirect("/mi_deseos");
            }

        }else{
            res.redirect("/iniciar");
        }


    },



    comprar:async function(ped,res){

        if(ped.session && ped.session.cliente){

            var  hoy = new Date();
            var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
            var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
            var fechaYHora = fecha + ' ' + hora;
 

            
            ped.session.carrito.forEach(async function(men){
                var query=`insert into registro_carrito(cliente_id,foto_id,fecha) values(${ped.session.cliente[0].id},${men.foto.id},'${fechaYHora}')`
                var compra_registro=await sails.sendNativeQuery(query);
            });


            ped.addFlash("mensaje","Su compra se realizo con exito")
             var query=`delete from carrito where cliente_id=${ped.session.cliente[0].id} `
             var comprar=await sails.sendNativeQuery(query);

             var carrito=await Carrito.find({cliente:ped.session.cliente[0].id}).populate("foto");
             ped.session.carrito=carrito;


             res.redirect("/mi_carrito")


        }else{
            res.redirect("/iniciar")
        }


    },

    mis_ordenes:async function(ped,res){
        if(ped.session && ped.session.cliente){
            var query=` select round(avg(cliente_id),0)as cliente_id,count(foto_id)as cantidad,fecha from registro_carrito where cliente_id=${ped.session.cliente[0].id } group by fecha order by cantidad DESC`
            var registro= await sails.sendNativeQuery(query);

            res.view("pages/private/orden.ejs",{orden:registro.rows})
        }
        else{
            res.redirect("/iniciar")
        }

    },

    detalles:async function(ped,res){

        if(ped.session.cliente && ped.session){
            var query=`select * from registro_carrito  join foto on foto_id =foto.id where cliente_id=${ped.session.cliente[0].id} and fecha= '${ped.params.fecha}' `;
            var detalles=await sails.sendNativeQuery(query);
    
            res.view("pages/private/detalle.ejs", {detalles:detalles.rows})
        }else{
            res.redirect("/iniciar")
        }

    }
};

