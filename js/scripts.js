(function() {
  const searchInput = document.querySelector('.search-bar__input');

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

    function extractTypes(types) {
      const extractedTypes = [];
      types.forEach(type => {
        extractedTypes.push(type.type);
      });
      return extractedTypes;
    }

    async function loadDetails(url) {
      const response = await fetch(url);
      const data = await response.json();
      const item = { 
        name: data.name,
        imageUrl: data.sprites.front_default,
        types: extractTypes(data.types),
        height: data.height / 10
      };
      return item;
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







  // function showLoadingMessage() {
  //   const loadingMessage = document.createElement('div');
  //   const $pokemonList = document.querySelector('.content-list');
  //   loadingMessage.classList.add('lds-dual-ring');
  //   $pokemonList.appendChild(loadingMessage);
  // }

  // function hideLoadingMessage() {
  //   const loadingMessage = document.querySelector('.lds-dual-ring');
  //   loadingMessage.parentNode.removeChild(loadingMessage);
  // }

  // function searchItems() {
  //   const filter = searchInput.value.toUpperCase();
  //   const ul = document.querySelector('.scroll-box');
  //   const li = ul.getElementsByTagName('li');
  //   let listItemText;
  //   let txtValue;

  //   // Loop through li and hide those that do not match criteria
  //   for (let i = 0; i < li.length; i += 1) {
  //     listItemText = li[i].getElementsByTagName('p')[0];
  //     txtValue = listItemText.textContent.toUpperCase();
  //     if (txtValue.indexOf(filter) > -1) {
  //       li[i].style.display = '';
  //     } else {
  //       li[i].style.display = 'none';
  //     }
  //   }
  // }

  // #endregion *** Item List Functions ***

  const pageMethods = (pageMethods => {
    let itemList = [];
    let itemShow = {};

    // DOM Elements
    const $itemContainer = document.getElementById('items-container');
    const $detailsSection = document.querySelector('.details-section');
    const $detailsImage = document.getElementById('details-image');
    const $detailsName = document.getElementById('details-name');
    const $detailsTypes = document.getElementById('details-types');
    const $detailsHeight = document.getElementById('details-height');

    const addTypes = (types) => {
      $detailsTypes.innerHTML = '';
      types.forEach((type) => {
        const typeElement = document.createElement('p');
        typeElement.textContent = type.name;
        typeElement.classList.add(`type-${type.name}`, 'other-detail__desc');
        $detailsTypes.appendChild(typeElement);
      }); 
    }

    const setDetails = (item) => {
      const { imageUrl, name, types, height } = item;
      $detailsImage.setAttribute('src', imageUrl);
      $detailsName.textContent = name;
      addTypes(types);
      $detailsHeight.textContent = `${height} m`;
    }

    const createElement = (element, classList, content, attr) => {
      const el = document.createElement(element);
      classList.forEach((c) => {
        el.classList.add(c);
      });
      if (content) {
        el.textContent = content;
      }
      if (attr) {
        el.setAttribute(attr.name, atr.value)
      }
      return el
    }

    const createImageElement = (src, classList) => {
      const el = document.createElement('img');
      classList.forEach((c) => {
        el.classList.add(c);
      });
      el.setAttribute('src', src);
      return el
    }

    const createOtherDetailElement = (label, values) => {
      const otherDetailElement = createElement('div', ['other-detail']);
      const labelElement = createElement('h3', ['other-detail__label'], label);
      const valueBoxElement = createElement('div', ['other-detail__label']);
      values.forEach((value) => {
        const valueElement = createElement('p', ['other-detail__value'], value);
        valueBoxElement.appendChild(valueElement);
      });
      otherDetailElement.appendChild(labelElement);
      otherDetailElement.appendChild(valueBoxElement);
      return otherDetailElement;
    }

    const createDetailsSection = (item) => {
      const { imageUrl, name, types, height } = item;
      const detailSection = createElement('div', ['details-container'])
      const imageBoxElement = createElement('div', ['image-box']);
      const imageElement = createImageElement(imageUrl, ['details-image']);
      imageBoxElement.appendChild(imageElement);

      const detailsBodyElement = createElement('div', ['details-body']);
      const detailsName = createElement('h2', ['details-name'], name);
      const otherBox = createElement('div', ['other-box']);
      const detailsTypes = createOtherDetailElement('types', types.map((type) => type.name));
      const detailsHeight = createOtherDetailElement('height', [height]);

      otherBox.appendChild(detailsTypes);
      otherBox.appendChild(detailsHeight);

      detailsBodyElement.appendChild(detailsName);
      detailsBodyElement.appendChild(otherBox);

      detailSection.appendChild(imageBoxElement);
      detailSection.appendChild(detailsBodyElement);
      return detailSection;
    }

    const loadItem = async (item) => {
      return await pokemonRepository.loadDetails(item.detailsUrl);
    }

    const addItemText = (itemName) => {
      const itemText = document.createElement('p');
      itemText.classList.add('item-name');
      itemText.textContent = itemName;
      return itemText;
    }

    const addItemButton = (item) => {
      const itemButton = document.createElement('button');
      const itemText = addItemText(item.name);
      itemButton.classList.add('item');
      itemButton.appendChild(itemText);
      itemButton.addEventListener('click', async function() {
        itemShow = await loadItem(item);
        document.querySelector('.details-container').remove();
        $detailsSection.appendChild(createDetailsSection(itemShow));
        toggleScreen();
      });
      return itemButton;
    }

    const createItemList = (items) => {
      const itemListElement = document.createElement('div');
      items.forEach(item => {
        const itemElement = addItemButton(item);
        itemListElement.appendChild(itemElement)
      });
      return itemListElement;
    }
    
    const toggleScreen = () => {
      document.querySelector('.wrapper').classList.toggle('wrapper-toggle');
    }

    const start = async () => {
      await pokemonRepository.loadList();
      itemList = pokemonRepository.getAll();
      $itemContainer.appendChild(createItemList(itemList));
      const $backButton = document.querySelector('.back');
      $backButton.addEventListener('click', toggleScreen)
    }

    return {
      start
    }
  })();

  pageMethods.start();

  
  // Add event listener on search bar
  // searchInput.addEventListener('keyup', searchItems);
})();
