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
    pokemonButton.addEventListener('click', function() {
      console.log(pokemon.name);
    })
    return pokemonButton;
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

  // ***********************
  // Define Global Functions

  function openContainer(){
    document.write('<div class="list-container">');
    document.write('<h2>List of Pokèmon</h2>');
  }

  function closeContainer(){
    document.write('</div>');
  }

  function returnParagraph(paragraph){
    return '<p>' + paragraph + '</p>';
  }

  function getHeightComment(height){
    return height > 2 ? ' - Wow that\'s Large!' : '';
  }

  function getHeightDescription(height){
    var heightComment = getHeightComment(height);
    return '(height: ' + height + 'm)' + heightComment;
  }

  function printTypes(pokemon){
    document.write('<p>Type: ');
    
    document.write('</p>');
    document.write('<br>');
  }

  function getPokemonTypes(pokemon){
    var pokemonTypes = '';
    for (var i = 0; i < pokemon.types.length; i++){
      var type = pokemon.types[i];
      var numberOfTypes = pokemon.types.length - 1;
      var typeClass = 'type type__' + type.toLowerCase();
      var typeOutput = '<span class="' + typeClass + '">' + type + '</span>';
      var pokemonType = pokemonTypes + i < numberOfTypes ? typeOutput + ', ' : typeOutput;
      pokemonTypes += pokemonType;
    }
    return pokemonTypes;
  }

  function getPokemonDescription(pokemon){
    var pokemonHeightDescription = getHeightDescription(pokemon.height);
    return pokemon.name + ' ' + pokemonHeightDescription;
  }

  function writePokemonDescription(pokemon){
    var pokemonDescription = getPokemonDescription(pokemon);
    var pokemonTypes = getPokemonTypes(pokemon);
    return document.write(returnParagraph(pokemonDescription) + returnParagraph(pokemonTypes) + '<br>');
  }

})();




/* Previous Version
**************************************
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

  openContainer();

  pokemonRepository.getAll().forEach(function(pokemon){
    writePokemonDescription(pokemon);
  });

  closeContainer();

  // ***********************
  // Define Global Functions

  function openContainer(){
    document.write('<div class="list-container">');
    document.write('<h2>List of Pokèmon</h2>');
  }

  function closeContainer(){
    document.write('</div>');
  }

  function returnParagraph(paragraph){
    return '<p>' + paragraph + '</p>';
  }

  function getHeightComment(height){
    return height > 2 ? ' - Wow that\'s Large!' : '';
  }

  function getHeightDescription(height){
    var heightComment = getHeightComment(height);
    return '(height: ' + height + 'm)' + heightComment;
  }

  function printTypes(pokemon){
    document.write('<p>Type: ');
    
    document.write('</p>');
    document.write('<br>');
  }

  function getPokemonTypes(pokemon){
    var pokemonTypes = '';
    for (var i = 0; i < pokemon.types.length; i++){
      var type = pokemon.types[i];
      var numberOfTypes = pokemon.types.length - 1;
      var typeClass = 'type type__' + type.toLowerCase();
      var typeOutput = '<span class="' + typeClass + '">' + type + '</span>';
      var pokemonType = pokemonTypes + i < numberOfTypes ? typeOutput + ', ' : typeOutput;
      pokemonTypes += pokemonType;
    }
    return pokemonTypes;
  }

  function getPokemonDescription(pokemon){
    var pokemonHeightDescription = getHeightDescription(pokemon.height);
    return pokemon.name + ' ' + pokemonHeightDescription;
  }

  function writePokemonDescription(pokemon){
    var pokemonDescription = getPokemonDescription(pokemon);
    var pokemonTypes = getPokemonTypes(pokemon);
    return document.write(returnParagraph(pokemonDescription) + returnParagraph(pokemonTypes) + '<br>');
  }

})();
*/