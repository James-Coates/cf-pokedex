(function pokeApp() {
  var repoAPI = (function repoAPI() {
    var repo = [];
    var pokemonDetails = {};
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    var publicAPI = {getAll, initList, loadDetails, getDetails};

    return publicAPI;

    // *************************
    function addToRepo(item) {
      if (typeof item == 'object' && !null) {
        repo.push(item);
      } else {
        console.log('Must be an object');
      }
    }

    function getAll() {
      return repo;
    }

    function getDetails() {
      return pokemonDetails;
    }

    function initList() {
      return fetch(apiUrl)
        .then(function toJson(response) {
          return response.json();
        })
        .then(function storeList(json) {
          var itemArray = json.results;
          itemArray.forEach(function storeItem(item) {
            let repoItem = {
              name: item.name,
              detailsUrl: item.url,
            };
            addToRepo(repoItem);
          });
        })
        .catch(function handleError(err) {
          console.log(err)
        });
    }

    function loadDetails(url) {
      return fetch(url)
        .then(function toJson(response) {
          // console.log(response.json());
          return response.json();
        })
        .then(function storeItemDetails(json) {
          console.log(json);
          pokemonDetails = {
            name: json.name,
            height: json.height,
            types: extractTypes(json.types),
            sprite: json.sprites.front_default,
          }
          console.log(pokemonDetails);
        })
        .catch(function handleError(err) {
          console.log(err)
        });
    }

    function extractTypes(types) {
      return types.map(function mapType(type) {
        return type.type.name;
      });
    }
  })();

  var domAPI = (function domAPI() {
    // DOM elements
    var $itemList = document.getElementById('items-container'); 
    var $detailsSection = document.getElementById('details-section');
    var $searchInput = document.querySelector('.search');
    var $backButton = document.querySelector('.back');

    var publicAPI = {initDOM};
    return publicAPI;

    // *************************

    function initDOM() {
      // Initialise item list
      var itemArray = repoAPI.getAll();
      var itemList = createItemsList(itemArray);
      appendItemListItems(itemList);
      // Add event listeners
      $searchInput.addEventListener('keyup', function handleSearchInput(e) {
        $itemList.innerHTML = ''
        var query = e.target.value.toLowerCase();
        var filteredArray = itemArray.filter(function findMatches(item) {
          return item.name.includes(query);
        });
        appendItemListItems(createItemsList(filteredArray));
      });
      $backButton.addEventListener('click', toggleScreen);
    }

    function createItemsList(arr) {
      if (!Array.isArray(arr)) {
        console.log('List items must be produced from an array');
      }
      return arr.map(createListItem);
    }

    function appendItemListItems(elementArray) {
      elementArray.forEach(function appendElement(element) {
        $itemList.appendChild(element);
      });
    }

    function createListItem(item) {
      if (typeof item == 'object' && !null) {
        return createButton(item);
      } else {
        console.log('List items must be objects');
      }
    }

    function createButton(item) {
      var {name, detailsUrl} = item;
      var itemButton = document.createElement('button');
      var buttonText = document.createElement('p');
      itemButton.appendChild(buttonText);
      itemButton.classList.add('item');
      buttonText.innerText = name;
      itemButton.addEventListener('click', function handleClick() {
        fetchDetails(detailsUrl);
        toggleScreen();
      });
      return itemButton;
    }

    function fetchDetails(url) {
      repoAPI.loadDetails(url)
        .then(function replaceDOM(returned) {
          document.querySelector('.details-container').remove();
          $detailsSection.appendChild(createDetailsSection(repoAPI.getDetails()));
        })
        .catch(function handleErr(err) {
          console.log(err);
        })
    }

    function createDetailsSection(item) {
      const { sprite, name, types, height } = item;

      var detailSection = document.createElement('div');
      detailSection.classList.add('details-container');

      detailSection.appendChild(createImageElement(item.sprite));
      detailSection.appendChild(createDetailsBody(item));

      return detailSection;
    }

    function createImageElement(sprite) {
      var imageBoxElement = document.createElement('div');
      imageBoxElement.classList.add('image-box');

      var imageElement = document.createElement('img');
      imageElement.setAttribute('src', sprite);
      imageBoxElement.appendChild(imageElement);

      return imageBoxElement;
    }

    function createDetailsBody(item) {
      var detailsBody = document.createElement('div');
      detailsBody.classList.add('details-body');

      var detailsName = document.createElement('h2');
      detailsName.classList.add('details-name');
      detailsName.innerText = item.name;
      detailsBody.appendChild(detailsName);
      
      var otherBox = document.createElement('div');
      otherBox.classList.add('other-box');
      detailsBody.appendChild(otherBox);

      otherBox.appendChild(createOtherDetailElement('height', item.height));
      otherBox.appendChild(createOtherDetailElement('types', item.types));

      return detailsBody;
    }

    function createOtherDetailElement (label, values) {
      var otherDetailElement = document.createElement('div');
      otherDetailElement.classList.add('other-detail');

      var labelElement = document.createElement('h3');
      otherDetailElement.classList.add('other-detail__label');
      labelElement.innerText = label;

      var valueBoxElement = document.createElement('div');

      // TODO not the best way of doing this
      if (Array.isArray(values)) {
        values.forEach(function createValueElement(value) {
          let valueElement = document.createElement('p');
          valueElement.classList.add('other-detail__value');
          valueElement.innerText = value;
          valueBoxElement.appendChild(valueElement);
        });
      } else {
        let valueElement = document.createElement('p');
          valueElement.classList.add('other-detail__value');
          valueElement.innerText = values;
          valueBoxElement.appendChild(valueElement);
      }
      
      otherDetailElement.appendChild(labelElement);
      otherDetailElement.appendChild(valueBoxElement);
      return otherDetailElement;
    }

    function toggleScreen() {
      document.querySelector('.wrapper').classList.toggle('wrapper-toggle');
    }

    function filterList(query) {
      return repoAPI.getAll.filter(function matchQuery(item) {
        item.name.includes(query);
      });
    }

  })();
  
  repoAPI.initList()
    .then(domAPI.initDOM);

})();

/*

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

*/