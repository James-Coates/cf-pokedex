(function() {
  // Global Variables

  // **********

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

    function loadDetails(item) {
      const url = item.detailsUrl;
      return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(details) {
          item.imageURL = details.sprites.front_default;
          item.height = details.height;
          item.types = [];
          details.types.forEach(function(type) {
            item.types.push(type.type.name);
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
      loadDetails,
    };
  })();

  // #region    *** Show Box Functions ***

  function clearContentBox() {
    const showBox = document.querySelector('.show-box');
    showBox.innerText = '';
    showBox.parentElement.classList.remove('is-visible');
  }

  function addCloseButton() {
    const closeButton = document.createElement('div');
    const closeButtonContent = document.createElement('i');
    closeButton.classList.add('show-box__close');
    closeButtonContent.classList.add('fas');
    closeButtonContent.classList.add('fa-times');
    closeButton.appendChild(closeButtonContent);
    closeButton.addEventListener('click', function() {
      clearContentBox();
    });
    return closeButton;
  }

  function addContentImage(imageURL) {
    const contentImageContainer = document.createElement('div');
    const contentImgElement = document.createElement('img');
    contentImgElement.setAttribute('src', imageURL);
    contentImageContainer.classList.add('show-box__image');
    contentImageContainer.appendChild(contentImgElement);
    return contentImageContainer;
  }

  function createPokemonType(pokemonType) {
    const pokemonTypeElement = document.createElement('p');
    pokemonTypeElement.innerText = pokemonType;
    pokemonTypeElement.classList.add('content-list__type');
    pokemonTypeElement.classList.add(`content-list__type--${pokemonType}`);
    return pokemonTypeElement;
  }

  function addContentBody(pokemon) {
    const contentBodyElement = document.createElement('div');
    const contentHeadingElement = document.createElement('h3');
    const contentDesc = document.createElement('p');

    contentHeadingElement.innerText = pokemon.name;
    contentBodyElement.classList.add('show-box__text');
    contentBodyElement.appendChild(contentHeadingElement);

    pokemon.types.forEach(function(pokemonType) {
      const pokemonTypeElement = createPokemonType(pokemonType);
      contentBodyElement.appendChild(pokemonTypeElement);
    });

    contentDesc.innerText = `Height: ${pokemon.height}m`;
    contentBodyElement.appendChild(contentDesc);

    return contentBodyElement;
  }

  function addContent(pokemon) {
    const $showBox = document.querySelector('.show-box');
    const contentImage = addContentImage(pokemon.imageURL);
    const contentBody = addContentBody(pokemon);
    const closeButton = addCloseButton();

    $showBox.appendChild(closeButton);
    $showBox.appendChild(contentImage);
    $showBox.appendChild(contentBody);
  }

  // #endregion *** Show Box Functions ***

  // #region    *** Item List Functions ***

  function addItemImage() {
    const itemImageElement = document.createElement('div');
    itemImageElement.classList.add('content-list__image');
    return itemImageElement;
  }

  function addItemText(pokemonName) {
    const pokemonText = document.createElement('p');
    pokemonText.classList.add('content-list__desc');
    pokemonText.textContent = pokemonName;
    return pokemonText;
  }

  function showDetails(pokemon) {
    pokemonRepository
      .loadDetails(pokemon)
      .then(clearContentBox)
      .then(function() {
        document.querySelector('.show-box-container').classList.add('is-visible');
        addContent(pokemon);
      });
  }

  function addItemButton(pokemon) {
    const itemButton = document.createElement('button');
    const itemImage = addItemImage(pokemon);
    const itemText = addItemText(pokemon.name);
    itemButton.classList.add('content-list__button');
    itemButton.appendChild(itemImage);
    itemButton.appendChild(itemText);
    itemButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
    return itemButton;
  }

  function addListItem(pokemon) {
    const $pokemonList = document.getElementById('pokemon-list');
    const itemButton = addItemButton(pokemon);
    const pokemonListItem = document.createElement('li');
    pokemonListItem.appendChild(itemButton);
    $pokemonList.appendChild(pokemonListItem);
  }

  function showLoadingMessage() {
    const loadingMessage = document.createElement('div');
    const $pokemonList = document.querySelector('.content-list');
    loadingMessage.classList.add('lds-dual-ring');
    $pokemonList.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    const loadingMessage = document.querySelector('.lds-dual-ring');
    loadingMessage.parentNode.removeChild(loadingMessage);
  }

  // #endregion *** Item List Functions ***

  pokemonRepository
    .loadList()
    .then(showLoadingMessage())
    .then(function() {
      hideLoadingMessage();
      pokemonRepository.getAll().forEach(function(pokemon) {
        addListItem(pokemon);
      });
    });
})();
