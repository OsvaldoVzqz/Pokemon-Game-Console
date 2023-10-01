class Player {
  constructor(name, species, pokeName, level) {
    this.name = name;
    this.pokemon = new Pokemon(species, pokeName, level);
  }

  selectMove() {
    let moves = this.pokemon.getMoves();
    let move = prompt("Select a move:\n" + moves.join("\n"), moves[0]);

    if (move === null) {
      return true;
    }

    if (moves.includes(move)) {
      this.pokemon.setCurrentMove(move);
    } else {
      alert("Invalid move. Please select again.");
      this.selectMove();
    }
  }
}

class Bot extends Player {
  selectMove() {
    let moves = this.pokemon.getMoves();
    let move = moves[Math.floor(Math.random() * moves.length)];
    this.pokemon.setCurrentMove(move);
  }
}
