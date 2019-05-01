var testing = (function(){

  var pokemonRepository = (function(){

    var pokemon = [
      {
        name: 'Bulbasaur',
        height: 0.7,
        types: ['Grass', 'Poison']
      },
      {
        name: 'Charmander',
        height: 0.6,
        types: ['Fire']
      },
      {
        name: 'Squirtle',
        height: 0.5,
        types: ['Water']
      },
      {
        name: 'Snorlax',
        height: 2.1,
        types: ['Normal']
      },
      {
        name: 'Snorlax',
        height: 2.1,
        types: ['Normal']
      },
      {
        name: 'Snorlax',
        height: 2.1,
        types: ['Normal']
      },
      {
        name: 'Snorlax',
        height: 2.1,
        types: ['Normal']
      },
      {
        name: 'Snorlax',
        height: 2.1,
        types: ['Normal']
      },
      {
        name: 'Snorlax',
        height: 2.1,
        types: ['Normal']
      },
      {
        name: 'Snorlax',
        height: 2.1,
        types: ['Normal']
      }
    ];

    function add(addedPokemon){
      if (typeof addedPokemon === 'object'){
        pokemon.push(pokemon);
      } else {
        console.log('Must be an object');
      }
    }

    function getAll(){
      return pokemon;
    }

    return {
      add: add,
      getAll: getAll
    }

  })();

  pokemonRepository.getAll().forEach(function(pokemon){
    addListItem(pokemon);
  });



  // New Global Functions

  function addListItem(pokemon) {
    var $pokemonList = document.getElementById("pokemon-list");
    var pokemonbutton = addItemButton(pokemon);
    var pokemonListItem = document.createElement('li');
    pokemonListItem.appendChild(pokemonbutton);

    $pokemonList.appendChild(pokemonListItem);
  }

  function addItemButton(pokemon) {
    var pokemonButton = document.createElement('button');
    var pokemonImage = addItemImage(pokemon);
    var pokemonText = addItemText(pokemon.name);
    pokemonButton.classList.add('content-list__button');
    pokemonButton.appendChild(pokemonImage);
    pokemonButton.appendChild(pokemonText);
    pokemonButton.addEventListener('click', function(){
      showDetails(pokemon);
    });
    return pokemonButton;
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

  function addItemText(pokemonName) {
    var pokemonText = document.createElement('p');
    pokemonText.classList.add('content-list__desc');
    pokemonText.textContent = pokemonName;
    return pokemonText;
  }

  function addItemImage(pokemonImage) {
    var pokemonImage = document.createElement('div');
    pokemonImage.classList.add('content-list__image');
    return pokemonImage;
  }

})();