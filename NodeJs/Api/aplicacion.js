const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var pool = mysql.createPool({  connectionLimit: 20,  host: 'localhost',  user: 'root',  password: '',  database: 'blog_viajes'});

app.get('/api',function(peticion,respuesta){
    respuesta.send('API REST');
});

app.get('/api/v1/autores',function(peticion,respuesta){
    pool.getConnection(function(error,connection){
        query = "SELECT * FROM autores;";
        connection.query(query,function(err,filas,campos){
            if (filas.length >0){
            respuesta.json({data:filas});
            } else {
                respuesta.status(404);
                respuesta.send('');
            }
        });
        connection.release();
    });
});

app.get('/api/v1/autores/:a_id',function(peticion,respuesta){
    pool.getConnection(function(error,connection){
        query = "SELECT * FROM autores WHERE id="+connection.escape(peticion.params.a_id)+";";
        connection.query(query,function(err,filas,campos){
            if (filas.length >0){
                nquery = "SELECT * FROM publicaciones WHERE autores_id="+connection.escape(peticion.params.a_id)+";";
                connection.query(nquery,function(nerr,nfilas,ncampos){
                    filas[0].publicaciones = nfilas;
                    respuesta.json({data:filas});
                });
            } else {
                respuesta.status(404);
                respuesta.send('');
            }
        });
        connection.release();
    });
});

app.post('/api/v1/autores',function(peticion,respuesta){
    pool.getConnection(function(error,connection){
        query="SELECT * FROM autores WHERE seudonimo =" + connection.escape(peticion.body.seudonimo);
        query+=" UNION ";
        query+="SELECT * FROM autores WHERE email =" + connection.escape(peticion.body.email);
        query+=";";
        connection.query(query,function(error,filas,campos){
            if (filas.length > 0) {
                respuesta.status(403);
                respuesta.send('AUTOR PREEXISTENTE')
            } else {
                query = "INSERT INTO autores (email,contrasena,seudonimo) VALUES ("+ connection.escape(peticion.body.email) + "," + connection.escape(peticion.body.contrasena) + "," + connection.escape(peticion.body.seudonimo) + ");";
                connection.query(query,function(error,filas,campos){
                    const nuevoId = filas.insertId;
                    nquery = "SELECT * FROM autores WHERE id=" + nuevoId;
                    connection.query(nquery,function(error,filas,campos){
                        respuesta.status(201);
                        respuesta.json({data:filas[0]});
                    });
                });
            }
        });
        connection.release();
    });
});

app.get('/api/v1/publicaciones',function(peticion,respuesta){
    pool.getConnection(function(error,connection){
        if (peticion.query.busqueda == undefined){
            query = "SELECT * FROM publicaciones;";
            connection.query(query,function(err,filas,campos){
                if (filas.length >0){
                respuesta.json({data:filas});
                } else {
                    respuesta.status(404);
                    respuesta.send('');
                }
            });
        } else {
            const primera = "'% "+connection.escape(peticion.query.busqueda)+" %'";
            const segunda = "'% "+connection.escape(peticion.query.busqueda)+"'";
            const tercera = "'"+connection.escape(peticion.query.busqueda)+" %'";
            const cuarta = "'"+connection.escape(peticion.query.busqueda)+"'";
            query = "SELECT * FROM publicaciones WHERE titulo LIKE "+primera+" OR titulo LIKE "+segunda+" OR titulo LIKE "+tercera+" OR titulo LIKE "+cuarta+" ";
            query += "UNION ";
            query += "SELECT * FROM publicaciones WHERE contenido LIKE "+primera+" OR contenido LIKE "+segunda+" OR contenido LIKE "+tercera+" OR contenido LIKE "+cuarta+" ";
            query += "UNION ";
            query += "SELECT * FROM publicaciones WHERE resumen LIKE "+primera+" OR resumen LIKE "+segunda+" OR resumen LIKE "+tercera+" OR resumen LIKE "+cuarta+" ";
            query += ";"
            connection.query(query,function(err,filas,campos){
                if (filas.length >0){
                respuesta.json({data:filas});
                } else {
                    respuesta.status(404);
                    respuesta.send('');
                }
            });
        }
        connection.release();
    });
});

app.get('/api/v1/publicaciones/:p_id',function(peticion,respuesta){
    pool.getConnection(function(error,connection){
        query = "SELECT * FROM publicaciones WHERE id="+connection.escape(peticion.params.p_id)+";";
        connection.query(query,function(err,filas,campos){
            if (filas.length >0){
            respuesta.json({data:filas});
            } else {
                respuesta.status(404);
                respuesta.send('');
            }
        });
        connection.release();
    });
});

app.post('/api/v1/publicaciones',function(peticion,respuesta){
    pool.getConnection(function(error,connection){
        query = "SELECT * FROM autores WHERE email = "+connection.escape(peticion.query.email)+" AND "+connection.escape(peticion.query.contrasena)+";";
        connection.query(query,function(err,filas,campos){
            if (filas.length == 1) {
                query = "INSERT INTO publicaciones (titulo,resumen,contenido,autores_id) VALUES ("+ connection.escape(peticion.body.titulo) + "," + connection.escape(peticion.body.resumen) + "," + connection.escape(peticion.body.contenido) + "," + connection.escape(filas[0].id) +");";
                connection.query(query,function(error,filas,campos){
                    const nuevoId = filas.insertId;
                    nquery = "SELECT * FROM publicaciones WHERE id=" + nuevoId;
                    connection.query(nquery,function(error,filas,campos){
                        respuesta.status(201);
                        respuesta.json({data:filas[0]});
                    });
                });
            } else {
                respuesta.status(403);
                respuesta.send('USUARIO O CONTRASEÑA ERRADOS');
            }
        });
    });
});

app.delete('/api/v1/publicaciones/:p_id',function(peticion,respuesta){
    pool.getConnection(function(error,connection){
        query = "SELECT * FROM autores WHERE email = "+connection.escape(peticion.query.email)+" AND contrasena = "+connection.escape(peticion.query.contrasena)+";";
        connection.query(query,function(err,filas,campos){
            if (filas.length == 1) {
                query = "SELECT * FROM publicaciones WHERE id="+ connection.escape(peticion.params.p_id) + " AND autores_id = "+connection.escape(filas[0].id)+";";
                connection.query(query,function(error,filas,campos){
                    if (filas.length == 1) {
                        nquery = "DELETE FROM publicaciones WHERE id="+connection.escape(peticion.params.p_id) + ";";
                        connection.query(nquery,function(error,filas,campos){
                            respuesta.status(204);
                            respuesta.send('BORRADO');
                        });
                    } else {
                        respuesta.status(403);
                        respuesta.send('PUBLICACION INEXISTENTE');
                    }
                });
            } else {
                respuesta.status(403);
                respuesta.send('USUARIO O CONTRASENA ERRADOS');
            }
        });
    });
});

app.listen(8080,function(){
    console.log('Servidor Iniciado');
})
