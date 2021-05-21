/** Variable tipo arreglo */
var arreglo = [1,2,3,4,5]
/** Se impirmir en la consola la variable */
console.log(arreglo);

/** Se declara una función que recibe un parametro alojada en una variable resultado1 */
var resultado1 = arreglo.map(function(x){
  /** Se devuleve la operación */
  return x * 2
});
/** Se imprime la variable que contiene la función  */
console.log(resultado1);

/** Se declara una función que recibe un parametro alojada en una variable resultado2 */
var resultado2 = arreglo.filter(function(x){
  /** Se valida si son  impares los datos de ese arreglo que es la variable arreglo */
  if( x % 2 === 0 ){
  } else {
    /** Se devuelve el valor del parametro */
    return x
  }
});

/** Se imprime la variable que contiene la función  */
console.log(resultado2);

/** Se declara una función que recibe un parametro alojada en una variable resultado3 */
var resultado3 = arreglo.map(function(x){
  /** Se valida si impar */
  if( x % 2 == 0 ){
    /** Se devuelve el valor de x dividido entre 2 */
   return x / 2
  }else{
    /** caso contrario se devuelve la multiplicaciones de los valores x con un valor de 2  */
   return x * 2
  }
});

/** Se imprime la variable que contiene la función  */
console.log(resultado3);
