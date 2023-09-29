class Battle {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  start() {
    console.log("The battle is about to start!");
    this.prepareBattle();

    while (true) {
      const move1 = this.player1.selectMove();
      const move2 = this.player2.selectMove();

      if (move1 === null || move2 === null) {
        console.log(`${move1 === null ? this.player1.name : this.player2.name} run away!`);
        break;
      }

      const firstPokemon = this.getFirstPokemon();
      const secondPokemon = firstPokemon === this.player1.pokemon ? this.player2.pokemon : this.player1.pokemon;

      firstPokemon.attack(secondPokemon);

      if (secondPokemon.isFainted()) {
        console.log(`${secondPokemon.name} FAINTED!`);
        console.log(`${firstPokemon.name} WINS!`);
        firstPokemon.processVictory(secondPokemon);
        break;
      }

      secondPokemon.attack(firstPokemon);

      if (firstPokemon.isFainted()) {
        console.log(`${firstPokemon.name} FAINTED!`);
        console.log(`${secondPokemon.name} WINS!`);
        secondPokemon.processVictory(firstPokemon);
        break;
      }
    }
  }

  prepareBattle() {
    this.player1.pokemon.prepareForBattle();
    this.player2.pokemon.prepareForBattle();
    console.log(`${this.player1.name} sent out ${this.player1.pokemon.name}!`);
    console.log(`${this.player2.name} sent out ${this.player2.pokemon.name}!`);
  }

  getFirstPokemon() {
    const firstByPriorityResult = this.firstByPriority();
    if (firstByPriorityResult !== null) {
      return firstByPriorityResult;
    }

    const firstBySpeedResult = this.firstBySpeed();
    if (firstBySpeedResult !== null) {
      return firstBySpeedResult;
    }

    // Si ninguno tiene prioridad o velocidad distintiva, elige aleatoriamente.
    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    return randomIndex === 0 ? this.player1.pokemon : this.player2.pokemon;
  }

  firstByPriority() {
    const move1 = this.player1.pokemon.currentMove;
    const move2 = this.player2.pokemon.currentMove;

    if (move1.priority > move2.priority) {
      return this.player1.pokemon;
    } else if (move2.priority > move1.priority) {
      return this.player2.pokemon;
    } else {
      return null;
    }
  }

  firstBySpeed() {
    if (this.player1.pokemon.stats.speed > this.player2.pokemon.stats.speed) {
      return this.player1.pokemon;
    } else if (this.player2.pokemon.stats.speed > this.player1.pokemon.stats.speed) {
      return this.player2.pokemon;
    } else {
      return null;
    }
  }

  printBattleStatus() {
    console.table([
      {
        Player: this.player1.name,
        Pokemon: this.player1.pokemon.name,
        Level: this.player1.pokemon.level,
        CurrentHP: this.player1.pokemon.currentHp,
      },
      {
        Player: this.player2.name,
        Pokemon: this.player2.pokemon.name,
        Level: this.player2.pokemon.level,
        CurrentHP: this.player2.pokemon.currentHp,
      },
    ]);
  }
}

