
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

// dejar de contar después de 10 segundos
setTimeout(() => clearInterval(timerId), 11000);
