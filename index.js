// Versión síncrona:
// Crear un nuevo Game y llamar al método start

// Versión asíncrona:
// Iniciar un contador de 10 segundos antes de empezar el juego
// Inciar un intervalo para mostras los segundos restantes en la consola
// Recuerda 'cancelar' el intervalo cuando llegue a 0 segundos

let contador = 10;

// Imprimir e incrementar contador cada segundo
let timerId = setInterval(() => {
  console.clear();
  console.log("El juego empezará en: " + contador);
  contador--;
  if (contador < 0) {
    let newGame = new Game();
    console.clear();
    newGame.start();
  }
}, 1000);
