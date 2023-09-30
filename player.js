class Player {
  constructor(name, species, pokeName, level) {
    // asignar name a un atributo con el mismo nombre
    this.name = name;
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
    this.pokemon = new Pokemon(species, pokeName, level);
    for (const propiedad in this.pokemon) {
      if (Object.hasOwnProperty.call(this.pokemon, propiedad)) {
        const elemento = this.pokemon[propiedad];
      }
    }
  }

  selectMove() {
    // mostrar al usuario los movimientos dosponibles
    const options = this.pokemon.moves;
    // Volver a pedir si ingresa un movimiento invalido
    while (true) {
      this.pokemon.setCurrenMove = prompt(
        // promp tomara el dato que se le de
        `elige el chanclaso que le vas a meter:\n${options.join("\n")}`, //choise your atack
        options[0]
      );
      if (options.includes(setCurrenMove)) break;

      alert("Esa no cuela, compa…"); //invalid option
    }

    alert(`Tú te aventaste con ${this.pokemon.moves.toUpperCase()}.`); //you selected
  }
}

// usar el numero length de la lista de ataques

class Bot extends Player {
  // selecciona un movimiento de maner aleatoria
  selectMove() {
    // let setCurrentMove;
    if (randomBetween < 0.5) {
      //solo tenemos 2 ataques asi que solo ocupamos un numero entre ellos
      setCurrentMove = this.pokemon.moves[0];
    } else {
      setCurrentMove = this.pokemon.moves[1];
    }
  }
  // los asigna con 'setCurrentMove'
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
