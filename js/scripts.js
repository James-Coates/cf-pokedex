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

  const pageMethods = (pageMethods => {
    let itemList = [];
    let itemShow = {};

    // DOM Elements
    const $itemContainer = document.getElementById('items-container');
    const $detailsSection = document.querySelector('.details-section');
    const $backButton = document.querySelector('.back');
    const $search = document.querySelector('.search');

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

    const addItemButton = (item) => {
      const itemButton = createElement('button', ['item'])
      const itemText = createElement('p', ['item-name'], item.name)
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

    const generateItemList = (itemList) => {
      $itemContainer.innerHTML = '';
      $itemContainer.appendChild(createItemList(itemList));
    }

    const filterList = (query) => {
      const filteredArray = itemList.filter((item) => item.name.includes(query));
      generateItemList(filteredArray);
    }

    const start = async () => {
      await pokemonRepository.loadList();
      itemList = pokemonRepository.getAll();
      generateItemList(itemList);
      $backButton.addEventListener('click', toggleScreen);
      $search.addEventListener('keyup', (e) => filterList(e.target.value))
    }

    return {
      start
    }
  })();

  pageMethods.start();

  
  // Add event listener on search bar
  // searchInput.addEventListener('keyup', searchItems);
})();
