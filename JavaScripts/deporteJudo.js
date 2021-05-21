// Se declara la variable deporte que contiene los datos
var deporte = {
    nombre:"judo",
    origen: "japon",
    clubes:{
      dojo:["Sensei VU", "Sensei Sata"],
      ciudad:["Inmaculada", "Tokio"],
    }
}
// se imprime en consola los resultados que contiene a variable deporte
// concatenando los string con las propiedades y sus posiciones de esa variable
console.log( `Club de ${deporte.nombre} ${deporte.clubes.dojo[0]} Ciudad:  ${deporte.clubes.ciudad[0]}`);
// resultado de la consulta: Club de judo Sensei VU Ciudad:  Inmaculada

// se alamacena el resultado en una variable mensaje con las primeras posiones del arreglo
var mensaje = `Club de ${deporte.nombre} ${deporte.clubes.dojo[1]} Ciudad: ${deporte.clubes.ciudad[1]}`
// se imprime la variable
console.log(` "${mensaje}" `);
// resultad de variable mensaje:  "Club de judo Sensei Sata Ciudad: Tokio"


/** Otro ejemplo */

var deporte = {
    nombre: 'Judo',
    origen: 'Japón',
  club: {
    dojo:['Sensei VU','Sensei Sato'],
    ciudad: ['Inmaculada','Tokio']
  }
}

function nombre( nombreDeporte, ciudad , club  ){
    return console.log( ` Clud de ${ nombreDeporte } ${ club } Ciudad:  ${ ciudad }`)
}

nombre( deporte.nombre , deporte.club.dojo[0] , deporte.club.ciudad[1] );
