class Player {
  constructor(name, species, pokeName, level) {
    // asignar name a un atributo con el mismo nombre
    this.name = name;
    this.species = species;
    this.pokeName = pokeName;
    this.level = level;
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
    this.pokemon = new Pokemon(this);
    for (const Propiedad in this.pokemon) {
      if (Object.hasOwnProperty.call(object, Propiedad)) {
        const element = object[Propiedad];
        
      }
    }
  }

  selectMove() {
    // mostrar al usuario los movimientos dosponibles
    this.pokemon.move('Movimiento 1');
    this.pokemon.move('Movimiento 2');
    // Volver a pedir si ingresa un movimiento invalido
    if (options.includes(pokemon.selectMove)) {//necesitamos tener mas informacion
      break;
    };
    alert("Invalid option");
    // Asigna el movimiento con 'setCurrentMove'
    setCurrenMove()
    // retornar 'true' en caso el usuario apreta Cancel
  }
}

class Bot extends Player {
  selectMove() {
    // selecciona un movimiento de maner aleatoria
    // los asigna con 'setCurrentMove'
  }
}
