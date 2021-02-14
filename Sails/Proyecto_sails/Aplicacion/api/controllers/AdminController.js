/**
 * PrivatedController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var path= require("path");
var mv= require("mv");


module.exports = {
    
    inicio:async function(ped,res){
        if(!ped.session.admin){
            res.redirect("/admin/iniciar")
        }else{
            var foto =await Foto.find().sort("id DESC");
            ped.session.admin_carrito=foto




            res.view("pages/admin/inicio")
        }
    },


    iniciar:async function(ped,res){
        res.view("pages/admin/iniciar")
    },
    procesar_iniciar:async function(ped,res){

        var admin_bloqueado = await Admin.find({email:ped.body.email,contraseña:ped.body.contrasena,estado:'bloqueado'});
        if(admin_bloqueado.length > 0){
            ped.addFlash('error','Su usuario admin fue bloqueado temporalmente');
            return res.redirect("/admin/iniciar");
        }




        var usuario= await Admin.find({email:ped.body.email,contraseña:ped.body.contrasena});

        if(usuario.length > 0){
            ped.session.cliente=undefined;
            ped.session.carrito=undefined;
            ped.session.deseos=undefined;

            ped.session.admin=usuario;
            res.redirect("/admin/")
        }else{
            ped.addFlash("error","Admin no encontrado")
            res.view("pages/admin/iniciar")
        }

    },

    agregar_foto:async function(ped,res){

        if(ped.session.admin){
            res.view("pages/admin/agregar_foto")

        }else{
            res.redirect("/admin/")
        }
    },
    procesar_agregar_foto:async function(ped,res){
        if(ped.session.admin){
        var foto= await Foto.create({titulo:ped.body.titulo,url:"nada",estado:"activa"}).fetch();


        ped.file("foto").upload(async function(eror,archivo){
            if(archivo && archivo[0]){
                var archivo=archivo[0].fd;
                var extencion_archivo=path.extname(archivo);

                if(extencion_archivo == ".exe"){
                    extencion_archivo =".png"
                }


                await Foto.update({id:foto.id}).set({url:`${foto.id}${extencion_archivo}`});
                mv(archivo,`./assets/images/${foto.id}${extencion_archivo}`,function(error){
                    
                })
            }



        })
        
        res.view("pages/admin/agregar_foto")
        }else{
            res.redirect("/admin/");
        }
    },

    desabilitar_foto:async function(ped,res){
        if(!ped.session.admin){
            res.redirect("/admin/")
        }else{            
            var foto = await  Foto.find({id:ped.query.foto});
            if(foto.length < 0){
                res.redirect("/admin/")
            }else{
                if(foto[0].estado == "activa"){
                    await  Foto.update({id:ped.query.foto}).set({estado:"inactiva"});
                    ped.addFlash("mensaje",`Se a desabilitado la foto ${foto[0].titulo}`)
                }else{
                    await  Foto.update({id:ped.query.foto}).set({estado:"activa"});
                    ped.addFlash("mensaje",`Se a habilitado la foto ${foto[0].titulo}`)
                }
                res.redirect("/admin/")
            }

        }

    },



    informe_clientes:async function (ped,res){
        if(!ped.session.admin){
            res.redirect("/admin/iniciar")
        }else{
            var cliente=await Cliente.find().sort("nombre ASC");

            res.view("pages/admin/admin_clientes.ejs",{cliente:cliente});
        }
    },
    desactivar_cliente:async function (ped,res){
        if(!ped.session.admin){
            res.redirect("/admin/iniciar")
        }
        else{

            var cliente=await Cliente.find({id:ped.query.cliente});

            if(cliente[0].estado == "activa"){
                await Cliente.update({id:ped.query.cliente}).set({estado:"bloqueado"})
                ped.addFlash("mensaje",`Se ah bloqueado el usuario ${cliente[0].nombre}`)
            }else{
                await Cliente.update({id:ped.query.cliente}).set({estado:"activa"})
                ped.addFlash("mensaje",`Se ah desbloqueado el usuario ${cliente[0].nombre}`)
            };
            res.redirect("/admin/clientes");
        }
    },
    ordenes_cliente:async function(ped,res){
        if(ped.session.admin ){
            var query=` select round(avg(cliente_id),0)as cliente_id,count(foto_id)as cantidad,fecha from registro_carrito where cliente_id=${ped.query.cliente } group by fecha order by cantidad DESC`
            var registro= await sails.sendNativeQuery(query);

            res.view("pages/admin/admin_orden_clientes.ejs",{orden:registro.rows})
        }
        else{
            res.redirect("/admin/")
        }

    },
    orden_detalles:async function(ped,res){

        if(ped.session.admin){
            var query=`select * from registro_carrito  join foto on foto_id =foto.id where cliente_id=${ped.params.id} and fecha= '${ped.params.fecha}' `;
            var detalles=await sails.sendNativeQuery(query);
    
            res.view("pages/private/detalle.ejs", {detalles:detalles.rows})
        }else{
            res.redirect("/iniciar")
        }

    },



    informe_admins:async function (ped,res){
        if(!ped.session.admin){
            res.redirect("/admin/iniciar")
        }else{
            var admin=await Admin.find({id:{"!=":ped.session.admin[0].id}}).sort("nombre ASC");

            res.view("pages/admin/admin_administradores.ejs",{admin:admin});
        }
    },
    desactivar_admin:async function(ped,res){
        if(!ped.session.admin){
            res.redirect("/admin/iniciar")
        }
        else{

            var admin=await Admin.find({id:ped.query.admin});

            if(admin[0].estado == "activa"){
                await Admin.update({id:ped.query.admin}).set({estado:"bloqueado"})
                ped.addFlash("mensaje",`Se ah bloqueado el usuario admin ${admin[0].nombre}`)
            }else{
                await Admin.update({id:ped.query.cliente}).set({estado:"activa"})
                ped.addFlash("mensaje",`Se ah desbloqueado el usuario admin ${admin[0].nombre}`)
            };
            res.redirect("/admin/admins");
        }
    },


    
    informe_dashboard:async function (ped,res){
        if(!ped.session.admin){
            res.redirect("/admin/iniciar")
        }else{
            var cliente=await Cliente.count();
            var fotos=await Foto.count();
            var admin=await Admin.count();
            var ordenes=await Registro_carrito.count();




            res.view("pages/admin/dashboard.ejs",{informe:{cliente:cliente,fotos:fotos,admin:admin,ordenes:ordenes}});
        }
    },










};

