const dataAPI = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);
buttonClear.addEventListener('click' , deletePokemons);

async function insertPokemon() {
  try {
    const res = await fetch(`${dataAPI}${pokemon.value.toLocaleLowerCase()}`)
    const pokemonDataJSON = await res.json()

    const allItems = [];
    const result = []; //*Guardar respuesta

    for (let pokemonInfo in pokemonDataJSON) { //*El objeto se convierte de  JSON a array
      result.push([pokemonInfo , pokemonDataJSON[pokemonInfo]]);
    }

    console.table(result);

    //*Crear imagen del Pokemon
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default;

    //*Nombre de pokemon y su ID
    const pokemonName = document.createElement('h4');
    pokemonName.innerText = `Nombre: ${result[10][1]} - ID: ${result[6][1]}`;

    //*Tipo de pokemon
    const pokemonType = document.createElement('h4');
    pokemonType.innerText = `Tipo: ${result[16][1][0].type.name}`;

    //*Fuerza del Pokemon
    const hp = document.createElement('p');
    hp.innerText = `Fuerza: ${result[15][1][0].base_stat}`;
    hp.classList.add('pokemonStats');

    //* Poder de ataque del pokemon
    const attack = document.createElement('p');
    attack.innerText = `Ataque: ${result[15][1][1].base_stat}`;
    attack.classList.add('pokemonStats');

    //* Defensa del pokemon
    const defense = document.createElement('p');
    defense.innerText = `Defensa: ${result[15][1][2].base_stat}`;
    defense.classList.add('pokemonStats');

    //* Ataque especial del pokemon
    const specialAttack = document.createElement('p');
    specialAttack.innerText = `Ataque especial: ${result[15][1][3].base_stat}`;
    specialAttack.classList.add('pokemonStats');

    //* Defensa especial del pokemon
    const specialDefense = document.createElement('p');
    specialDefense.innerText = `Defensa especial: ${result[15][1][4].base_stat}`;
    specialDefense.classList.add('pokemonStats');

    //* Velocidad de ataque del Pokemon
    const speed = document.createElement('p');
    speed.innerText = `Velocidad: ${result[15][1][5].base_stat}`;
    speed.classList.add('pokemonStats');

    //* Contenerdor de estadisticas del Pokemon
    const stats = document.createElement('div');
    stats.append(hp, attack, defense, specialAttack, specialDefense, speed);
    stats.classList.add('pokemonStatsContainer');

    //*Crear contenedor
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonName ,pokemonType, stats);
    container.classList.add('container');

    allItems.push(container);

    appNode.append(...allItems);

  } catch (error) {
    alert("No se encuentra este pokemon, por favor intente buscar otro pokemon");
  }
}

//*Eliminar Pokemon
function deletePokemons() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}