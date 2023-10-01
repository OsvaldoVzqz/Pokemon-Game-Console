class Game {
  static welcome() {
    alert("Welcome to the Pokemon Universe!");
    let name = prompt("Enter your name:");
    let speciesChoice = prompt(
      "Choose your starter: Bulbasaur, Charmander, Squirtle"
    );
    let pokeName = prompt("Name your Pokemon:");
    return [name, speciesChoice, pokeName];
  }

  start() {
    let [playerName, species, pokeName] = Game.welcome();
    this.player = new Player(playerName, species, pokeName, 5);

    let choice;
    while ((choice = Game.menu()) !== null) {
      if (choice === "Train") {
        this.train();
      } else if (choice === "Stats") {
        this.showStats();
      } else if (choice === "Leader") {
        this.challengeLeader();
      } else {
        alert("Invalid option. Please choose again.");
      }
    }

    Game.goodbye();
  }

  train() {
    function randomPokemon() {
      const randomPokeData =
        Pokemons[Math.floor(Math.random() * Pokemons.length)];
      return randomPokeData.species;
    }

    let speciesChoice = randomPokemon();
    let bot = new Bot(
      "Random Person",
      speciesChoice,
      speciesChoice,
      Math.floor(Math.random() * 5) + 1
    );

    console.log(
      `%c${this.player.name} challenges ${bot.name} for training`,
      "font-weight: bold;"
    );
    console.log(
      `${bot.name} has a ${bot.pokemon.name} level ${bot.pokemon.level}`
    );

    // Usar confirm() para preguntar al usuario si quiere pelear "Do you want to fight?"
    var resultado = confirm("Do you want to fight?");

    // Si, sí quiere pelear
    if (resultado) {
      console.log("`%cThe battle is about to start!", "font-weight: bold;");
      console.log(
        `${
          this.player.name
        } sent out ${this.player.pokemon.name.toUpperCase()}!`
      );
      console.log(`${bot.name} sent out ${bot.pokemon.name.toUpperCase()}!`);
      console.log("`%cBattle Start!", "font-weight: bold;");
      const battle = new Battle(this.player, bot);
      battle.start();
    } else {
      Game.menu();
    }
    // Crear una Batalla entre el player y el oponente
    // empezar la batalla con su start
  }

  challengeLeader() {
    let bot = new Bot("Brock", "Onix", "RockSnake", 10);
    console.log(`${bot.name} accepts your challenge!`);
    let battle = new Battle(this.player, bot);
    battle.start();
  }

  showStats() {
    let obj = this.player.pokemon,
      pkmnStats = obj.stats;
    console.table({
      species: obj.species,
      level: obj.level,
      type: obj.type.join(", "),
      experiencePoints: obj.experiencePoints,
      stats: "",
      hp: pkmnStats.hp,
      attack: pkmnStats.attack,
      defense: pkmnStats.defense,
      specialAttack: pkmnStats.specialAttack,
      specialDefense: pkmnStats.specialDefense,
      speed: pkmnStats.speed,
    });
  }

  static welcome() {
    alert(`Welcome to Pokemon Yellow

Hello there! Welcome to the world of POKEMON! My name is OAK! People call me the POKEMON PROF!

This world is inhabited by creatures called POKEMON! For some people, POKEMON are pets. Others use them for fights.

Myself... I study POKEMON as a profession.`);

    const name = prompt("First, what is your name?", "Ash");

    alert(`Right! So your name is ${name.toUpperCase()}!

Your very own POKEMON legend is about to unfold! A world of dreams and adventures with POKEMON awaits! Let's go!

Here, ${name.toUpperCase()}! There are 3 POKEMON here!

When I was young, I was a serious POKEMON trainer. In my old age, I have only 3 left, but you can have one!`);

    const options = ["Bulbasaur", "Charmander", "Squirtle"];
    let pokemon;
    while (true) {
      pokemon = prompt(
        `Choose your pokemon:\n${options.join("\n")}`,
        options[0]
      );
      if (options.includes(pokemon)) break;

      alert("Invalid option");
    }

    alert(`You selected ${pokemon.toUpperCase()}. Great choice!`);

    const pokemonName =
      prompt("You can name your pokemon:", pokemon) || pokemon;

    alert(`${name.toUpperCase()}, raise your young ${pokemonName.toUpperCase()} by making it fight!

When you feel ready you can challenge BROCK, the PEWTER's GYM LEADER`);

    return [name, pokemon, pokemonName];
  }

  static menu() {
    // pedir al usuario que elija entre "Train", "Stats", "Leader";

    let selection = prompt(
      "What do you want to do next? / Que quieres hacer a continuación?\n Train \n Stats \n Leader",
      "Train"
    );
    if (selection === "") {
      alert("Invalid option / opción inválida");
      return this.menu();
    }
    if (selection === null) this.goodbye();
    // retornar una opcion valida
    return selection;
  }

  static goodbye() {
    console.log("%cThanks for playing Pokemon Yellow", "font-weight: bold");
    console.log(
      "This game was created with love by: Osvaldo Vázquez, Victor Orozco, Adrián Magaña and Nestor Castañeda"
    );
  }
}
