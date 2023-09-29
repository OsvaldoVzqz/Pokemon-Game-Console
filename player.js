class Player {
  constructor(name, species, pokeName, level) {
    this.name = name;
    this.pokemon = new Pokemon(species, pokeName, level);
  }

  selectMove() {
    const options = this.pokemon.moves;
    while (true) {
      const selectedMove = prompt(
        `Elige el ataque que deseas usar:\n${options.join("\n")}`,
        options[0]
      );
      console.log("Usuario eligió:", selectedMove); // Agrega esta línea
      if (options.includes(selectedMove)) break;

      alert("Esa no cuela, compa…");
    }

    alert(`Tú te aventaste con ${this.pokemon.getCurrentMove().toUpperCase()}.`);
  }
}

class Bot extends Player {
  selectMove() {
    let setCurrentMove;
    if (randomBetween(0, 1) < 0.5) {
      setCurrentMove = this.pokemon.moves[0];
    } else {
      setCurrentMove = this.pokemon.moves[1];
    }
    this.pokemon.setCurrentMove(setCurrentMove); // Asigna el movimiento seleccionado
  }
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}