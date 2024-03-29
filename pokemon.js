class Pokemon {
  constructor(species, name, level) {
    this.species = species;
    this.name = name || species;
    this.level = level;

    const pokeData = Pokemons.find((p) => p.species === species);

    this.type = pokeData.type;
    this.baseExp = pokeData.baseExp;
    this.effortPoints = pokeData.effortPoints;
    this.growthRate = pokeData.growthRate;
    this.moves = pokeData.moves;
    this.baseStats = pokeData.baseStats;

    const growFunction = ExperienceCurves[this.growthRate];
    this.experiencePoints = level === 1 ? 0 : Math.round(growFunction(level));

    this.individualValues = {
      hp: randomBetween(0, 31),
      attack: randomBetween(0, 31),
      defense: randomBetween(0, 31),
      specialAttack: randomBetween(0, 31),
      specialDefense: randomBetween(0, 31),
      speed: randomBetween(0, 31),
    };

    this.effortValues = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };
  }

  // METODOS

  // calcular las estadisticas actuales del Pokémon
  get stats() {
    const stats = {
      hp: Math.floor(
        ((2 * this.baseStats.hp +
          this.individualValues.hp +
          this.effortValues.hp) *
          this.level) /
          100 +
          this.level +
          10
      ),
      attack: Math.floor(
        ((2 * this.baseStats.attack +
          this.individualValues.attack +
          this.effortValues.attack) *
          this.level) /
          100 +
          5
      ),
      defense: Math.floor(
        ((2 * this.baseStats.defense +
          this.individualValues.defense +
          this.effortValues.defense) *
          this.level) /
          100 +
          5
      ),
      specialAttack: Math.floor(
        ((2 * this.baseStats.specialAttack +
          this.individualValues.specialAttack +
          this.effortValues.specialAttack) *
          this.level) /
          100 +
          5
      ),
      specialDefense: Math.floor(
        ((2 * 2 * this.baseStats.specialDefense +
          this.individualValues.specialDefense +
          this.effortValues.specialDefense) *
          this.level) /
          100 +
          5
      ),
      speed: Math.floor(
        ((2 * this.baseStats.speed +
          this.individualValues.speed +
          this.effortValues.speed) *
          this.level) /
          100 +
          5
      ),
    };
    return stats;
  }

  expForLevel(n) {
    const growFunction = ExperienceCurves[this.growthRate]; // obtener la función de crecimiento del pokedex
    return growFunction(n); // retornar el resultado de llamar a la función pasando `n`
  }

  prepareForBattle() {
    this.currentHp = this.stats.hp; // asignar al atributo currentHp la estadistica HP del Pokemon
    this.currentMove = null; // resetear el atributo currentMove a null
  }

  receiveDamage(damage) {
    this.currentHp = Math.max(0, this.currentHp - damage); // reducir currentHp en la cantidad de damage. No debe quedar menor a 0.
  }

  getMoves() {
    return this.moves;
  }

  getStats() {
    return this.baseStats;
  }

  setCurrentMove(move) {
    const foundMove = Moves.find((m) => m.name === move);
    if (foundMove) {
      this.currentMove = foundMove;
    } else {
      console.log(`Move ${move} not found.`);
    }
  }

  getCurrentMove() {
    return this.currentMove ? this.currentMove.name : "N/A";
  }

  isFainted() {
    return this.currentHp === 0; // retornar si currentHp es 0 o no
  }

  moveHits() {
    const chance = randomBetween(1, 100); // calcular si pega en base al accuracy del currentMove
    return chance <= this.currentMove.accuracy;
  }

  isCritical() {
    return randomBetween(1, 16) === 1; // 1/16 de probabilidad que sea critico
  }

  calculateBaseDamage(target) {
    const isSpecial = SpecialMoveTypes.includes(this.currentMove.type); // determinar si el movimiento es especial comparando el currentMove con la data de Pokedex (SpecialMoveTypes)
    const attackStat = isSpecial ? this.stats.specialAttack : this.stats.attack; // determinar si se usara el stat attack o specialAttack del atacante
    const defenseStat = isSpecial
      ? this.stats.specialDefense
      : this.stats.defense; // determinar si se usara el stat defense o specialDefense del defensor

    return (
      Math.floor(
        Math.floor(
          (Math.floor((2 * this.level) / 5.0 + 2) *
            attackStat *
            this.currentMove.power) /
            defenseStat
        ) / 50
      ) + 2
    ); // retornar el resultado de la formula de daño
  } //Math.floor((attackStat / defenseStat) * this.currentMove.power);

  // calcular el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
  calculateEffectiveness(target) {
    const moveType = this.currentMove.type;
    const multipliers = target.type.map(
      (t) => TypeMultiplier[moveType][t] || 1
    );
    return multipliers.reduce((acc, curr) => acc * curr, 1);
  }

  attack(target) {
    console.log(`${this.name} used ${this.currentMove.name}`); // anunciar "[nombre] used [MOVE]!"

    if (this.moveHits()) {
      // determinar si el movimiento "pega" con moveHits()   // si "pega":
      let damage = this.calculateBaseDamage(target); //  calcular daño base con calculateDamage
      const criticalHit = this.isCritical();
      if (criticalHit) {
        //  determinar si es un critical hit con isCritical
        console.log("Critical Hit!"); //  si es critico, anunciarlo
        damage *= 2;
      }

      const effectiveness = this.calculateEffectiveness(target); //  calcular el multiplicador de efectividad con calculateEffectiveness

      if (effectiveness > 1) {
        console.log("It's super effective!");
      } else if (effectiveness < 1) {
        console.log("It's not very effective"); // anunciar mensaje según efectividad. Por ejemplo "It's not very effective..."
      }

      damage = Math.floor(damage * effectiveness); //  calcular el daño final usando el daño base, si fue critico o no y la efectividad

      target.receiveDamage(damage); //  Hacer daño al oponente usando su metedo receiveDamage
      console.log(`And it hit ${target.name} with ${damage} damage.`); //  Anunciar el daño hecho: "And it hit [oponente] with [daño] damage"
    } else {
      // si no "pega"
      console.log("But it MISSED!"); //  anunciar "But it MISSED!"
    }
  }

  processVictory(target) {
    // calcular la experiencia ganada e incrementarla a tus experiencePoints

    const expGain = Math.floor((target.baseExp * target.level) / 7);
    this.experiencePoints += expGain;

    this.effortValues[target.effortPoints.type] += target.effortPoints.amount; // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    //console.log(target.effortPoints.type);
    console.log(`${this.name} gained ${expGain} experience points`); // anunciar "[nombre] gained [cantidad] experience points"

    if (this.experiencePoints >= this.expForLevel(this.level + 1)) {
      // verificar si los nuevos experiencePoints te llevan a subir de nivel
      this.level++; // si se sube de nivel
      console.log(`${this.name} reached level ${this.level}`); // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
    }
  }
}
