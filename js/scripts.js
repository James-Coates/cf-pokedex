var app = (function(){

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

    function add(pokemon){
      pokemon.push(pokemon);
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

    // document.write(getPokemonDescription(pokemon));

    writePokemonDescription(pokemon);
    // writePokemonTypes(pokemon);

  });

  closeContainer();


  // Define Global Functions

  function openContainer(){
    document.write('<div class="list-container">')
    document.write('<h2>List of Pokèmon</h2>')
  }

  function closeContainer(){
    document.write('</div>');
  }

  function returnParagraph(paragraph){
    return '<p>' + paragraph + '</p>'
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
