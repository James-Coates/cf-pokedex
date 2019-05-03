/* eslint-disable no-unused-vars */

const app = (function() {
  // Global Functions
  function addItemImage(pokemonImage) {
    const pokemonImageHtml = document.createElement('div');
    pokemonImageHtml.classList.add('content-list__image');
    return pokemonImageHtml;
  }

  function addItemText(pokemonName) {
    const pokemonText = document.createElement('p');
    pokemonText.classList.add('content-list__desc');
    pokemonText.textContent = pokemonName;
    return pokemonText;
  }

  function showDetails(pokemon) {
    // eslint-disable-next-line no-console
    console.log(pokemon);
  }

  function addItemButton(pokemon) {
    const pokemonButton = document.createElement('button');
    const pokemonImage = addItemImage(pokemon);
    const pokemonText = addItemText(pokemon.name);
    pokemonButton.classList.add('content-list__button');
    pokemonButton.appendChild(pokemonImage);
    pokemonButton.appendChild(pokemonText);
    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
    return pokemonButton;
  }

  function addListItem(pokemon) {
    const $pokemonList = document.getElementById('pokemon-list');
    const pokemonbutton = addItemButton(pokemon);
    const pokemonListItem = document.createElement('li');
    pokemonListItem.appendChild(pokemonbutton);

    $pokemonList.appendChild(pokemonListItem);
  }

  const pokemonRepository = (function() {
    const repository = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Repository Functions
    // ********************

    function add(addedPokemon) {
      if (typeof addedPokemon === 'object') {
        repository.push(addedPokemon);
      } else {
        // eslint-disable-next-line no-console
        console.log('Must be an object');
      }
    }

    function getAll() {
      return repository;
    }

    function loadList() {
      return fetch(apiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          // access results object within json and iterate
          json.results.forEach(function(item) {
            const pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function(e) {
          // eslint-disable-next-line no-console
          console.error(e);
        });
    }

    return {
      add,
      getAll,
      // search: search, // #TODO
      loadList,
    };
  })();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      addListItem(pokemon);
    });
  });
})();
