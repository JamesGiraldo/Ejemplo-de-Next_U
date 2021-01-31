/**
 * @author Alex Apaza
 */
var bodyParser = require('body-parser'),
	http = require('http'),
	path = require('path'),
	express = require('express'),
	session = require('express-session'),
	rutaLogin = require('./server/usuarios/rutas.js'),
	rutaArticulos = require('./server/articulos/rutas.js');

var PORT = 3000,
	app = express(),
	Server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: "$e$$ionNextU2017",
	resave: false,
	saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/login', rutaLogin);
app.use('/articulos', rutaArticulos);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

Server.listen(PORT, () => {
	console.log('Server is listening on port: '+PORT);
});
