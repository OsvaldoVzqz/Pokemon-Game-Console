class Game {
  start() {
    // llamar a welcome para el proceso de bienvenida y obtener el arreglo [name, pokemon, pokemonName]
    let userData = Game.welcome();

    // crear un Player con la info obtenida (tu pokemon empieza con nivel 3 por defecto). Asignarlo al atributo 'player'
    //let Player = new Player(userData[0], userData[1], userData[2], 3);
    // Empezar el bucle del juego

    // Usar menu() para pedir al usuario que elija entre Train, Leader o Stats
    let choice = Game.menu();
    // Ejecutar train(), challengeLeader() o showStats() segun la opción del usuario
    if (choice === "Train") this.train();
    if (choice === "Stats") this.showStats();
    if (choice === "Leader") this.challengeLeader();
    // Continuar el bucle hasta que el usuario aprete Cancel
    // Llamar a goodbye para la despedida
    Game.goodbye();
  }

  train() {
    alert("se eligió Train");
    // Crear un Bot llamado "Random Person", con un Pokemon aleatorio de nivel entre 1 y 5
    // Anunciar "[nombre] challenges [oponente] for training"
    // Anunciar "[oponente] has a [pokemon] level [nivel]"
    // Usar confirm() para preguntar al usuario si quiere pelear "Do you want to fight?"
    // Si, sí quiere pelear
    // Crear una Batalla entre el player y el oponente
    // empezar la batalla con su start
  }

  challengeLeader() {
    alert("se eligió Leader");
    // mismo mecanismo que train() pero el Bot se llama Brock y usa un Onix nivel 10
  }

  showStats() {
    alert("se eligió Stats");
    // usar console.table para presentar las estadisticas de tu pokemon:
    /*
      - species
      - level
      - type
      - experiencePoints
      stats:
      - hp
      - attack
      - defense
      - specialAttack
      - specialDefense
      - speed
    */
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
