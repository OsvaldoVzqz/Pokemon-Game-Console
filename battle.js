class Battle {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  start() {
    console.log(
      "Battle between",
      this.player1.name,
      "and",
      this.player2.name,
      "has started!",
      this.player1.pokemon.prepareForBattle(),
      this.player2.pokemon.prepareForBattle()
    );

    let firstPlayer = this.getFirstPlayer();
    let secondPlayer =
      firstPlayer === this.player1 ? this.player2 : this.player1;

    while (
      !firstPlayer.pokemon.isFainted() &&
      !secondPlayer.pokemon.isFainted()
    ) {
      if (this.player1.selectMove() || this.player2.selectMove()) {
        console.log("Player decided to flee.");
        return;
      }
      firstPlayer.pokemon.attack(secondPlayer.pokemon);
      this.printBattleStatus();
      // Verificamos si el segundo Pokémon todavía tiene HP antes de que ataque.
      if (!secondPlayer.pokemon.isFainted()) {
        secondPlayer.pokemon.attack(firstPlayer.pokemon);
        this.printBattleStatus();
      }
    }
  }

  getFirstPlayer() {
    let priorityResult = this.firstByPriority();
    if (priorityResult) return priorityResult;

    let speedResult = this.firstBySpeed();
    if (speedResult) return speedResult;

    return Math.random() < 0.5 ? this.player1 : this.player2;
  }

  getSecondPokemon() {
    return this.getFirstPokemon() === this.player1
      ? this.player2
      : this.player1;
  }

  firstByPriority() {
    if (
      !this.player1.pokemon.currentMove ||
      !this.player2.pokemon.currentMove
    ) {
      return null;
    }

    if (
      this.player1.pokemon.currentMove.priority >
      this.player2.pokemon.currentMove.priority
    ) {
      return this.player1;
    }
    if (
      this.player1.pokemon.currentMove.priority <
      this.player2.pokemon.currentMove.priority
    ) {
      return this.player2;
    }
    return null;
  }

  firstBySpeed() {
    if (this.player1.pokemon.speed > this.player2.pokemon.speed) {
      return this.player1;
    }
    if (this.player1.pokemon.speed < this.player2.pokemon.speed) {
      return this.player2;
    }
    return null;
  }

  printBattleStatus() {
    let status = [
      {
        Player: this.player1.name,
        Pokemon: this.player1.pokemon.name,
        Level: this.player1.pokemon.level,
        HP: this.player1.pokemon.currentHp,
      },
      {
        Player: this.player2.name,
        Pokemon: this.player2.pokemon.name,
        Level: this.player2.pokemon.level,
        HP: this.player2.pokemon.currentHp,
      },
    ];
    console.table(status);
  }
}
