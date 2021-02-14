/**
 * PublicController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    inicio:async function(ped,res){
        

        var inicio= await Foto.find({estado:"activa"}).skip(0).limit(10).sort("id DESC");
        if(ped.session.cliente){
            res.view("pages/public/inicio",{fotos:inicio,cliente:ped.session.cliente})
        }
        else{
            res.view("pages/public/inicio",{fotos:inicio})
        }


    },
  
    top_vendidas:async function(ped,res){
    var query=`select titulo,url,estado,foto.id,count(*)as cantidad from registro_carrito join foto on foto_id=foto.id group by foto.id having foto.estado = 'activa' order by cantidad DESC `;

    var top= await sails.sendNativeQuery(query)

    res.view("pages/public/top_vendidas.ejs",{fotos:top.rows});
    },

    acerca:async function(ped,res){
        res.view("pages/public/Acerca.ejs");
    }

};

