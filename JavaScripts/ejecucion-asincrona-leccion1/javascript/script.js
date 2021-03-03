function promesa() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      const number = parseInt(Math.random() * 10);
      if (number % 2 == 0) {
        resolve(number);
      } else {
        reject("Rechazado");
      }
    }, 1000);
  });

  return promise;
}

async function procesar() {
  try {
    var resultado = await promesa();
    console.log("Resultado: ", resultado);
  } catch (error) {
    console.log("error: ", error);
  }
}

procesar();
