class Taller{ //Definimos la clase
    constructor(identicador,tipo,version){ //definimos el constructor de la clase que indica que la clase tiene tres elementos
        this.identicador = identicador;
        this.tipo = tipo;
        this.version = version;
    }

    generarNombre(){ //metodo de la clase que retorna  la estructura del mensaje usando los valores que se pasen en el parametro
        return 'COMP18S'+this.identicador+''+this.tipo+'_'+this.version+'.midoc'
    }
}
//aqui abajo se crean instancias de la clase cambiando los parametros
var a1 = new Taller('1','interactividad','V1')
var a2 = new Taller('2','ejercicio','V2')
var a3 = new Taller('3','laboratorio','V1')
//aqui abajo se ejecuta el metodo que genera el nombre de las instancia que creamos arriba
console.log(a1.generarNombre())
console.log(a2.generarNombre())
console.log(a3.generarNombre())
