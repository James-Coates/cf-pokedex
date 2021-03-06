// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@babel/runtime/helpers/typeof.js":[function(require,module,exports) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],"js/scripts.js":[function(require,module,exports) {
"use strict";

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function pokeApp() {
  var repoAPI = function repoAPI() {
    var repo = [];
    var pokemonDetails = {};
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    var publicAPI = {
      getAll: getAll,
      initList: initList,
      loadDetails: loadDetails,
      getDetails: getDetails
    };
    return publicAPI; // *************************

    function addToRepo(item) {
      if ((0, _typeof2.default)(item) == 'object' && !null) {
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
      return fetch(apiUrl).then(function toJson(response) {
        return response.json();
      }).then(function storeList(json) {
        var itemArray = json.results;
        itemArray.forEach(function storeItem(item) {
          var repoItem = {
            name: item.name,
            detailsUrl: item.url
          };
          addToRepo(repoItem);
        });
      }).catch(function handleError(err) {
        console.log(err);
      });
    }

    function loadDetails(url) {
      return fetch(url).then(function toJson(response) {
        // console.log(response.json());
        return response.json();
      }).then(function storeItemDetails(json) {
        console.log(json);
        pokemonDetails = {
          name: json.name,
          height: json.height,
          types: extractTypes(json.types),
          sprite: json.sprites.front_default
        };
        console.log(pokemonDetails);
      }).catch(function handleError(err) {
        console.log(err);
      });
    }

    function extractTypes(types) {
      return types.map(function mapType(type) {
        return type.type.name;
      });
    }
  }();

  var domAPI = function domAPI() {
    // DOM elements
    var $itemList = document.getElementById('items-container');
    var $detailsSection = document.getElementById('details-section');
    var $searchInput = document.querySelector('.search');
    var $backButton = document.querySelector('.back');
    var publicAPI = {
      initDOM: initDOM
    };
    return publicAPI; // *************************

    function initDOM() {
      // Initialise item list
      var itemArray = repoAPI.getAll();
      var itemList = createItemsList(itemArray);
      appendItemListItems(itemList); // Add event listeners

      $searchInput.addEventListener('keyup', function handleSearchInput(e) {
        $itemList.innerHTML = '';
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
      if ((0, _typeof2.default)(item) == 'object' && !null) {
        return createButton(item);
      } else {
        console.log('List items must be objects');
      }
    }

    function createButton(item) {
      var name = item.name,
          detailsUrl = item.detailsUrl;
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
      repoAPI.loadDetails(url).then(function replaceDOM(returned) {
        document.querySelector('.details-container').remove();
        $detailsSection.appendChild(createDetailsSection(repoAPI.getDetails()));
      }).catch(function handleErr(err) {
        console.log(err);
      });
    }

    function createDetailsSection(item) {
      var sprite = item.sprite,
          name = item.name,
          types = item.types,
          height = item.height;
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

    function createOtherDetailElement(label, values) {
      var otherDetailElement = document.createElement('div');
      otherDetailElement.classList.add('other-detail');
      var labelElement = document.createElement('h3');
      otherDetailElement.classList.add('other-detail__label');
      labelElement.innerText = label;
      var valueBoxElement = document.createElement('div'); // TODO not the best way of doing this

      if (Array.isArray(values)) {
        values.forEach(function createValueElement(value) {
          var valueElement = document.createElement('p');
          valueElement.classList.add('other-detail__value');
          valueElement.innerText = value;
          valueBoxElement.appendChild(valueElement);
        });
      } else {
        var valueElement = document.createElement('p');
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
  }();

  repoAPI.initList().then(domAPI.initDOM);
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
},{"@babel/runtime/helpers/typeof":"node_modules/@babel/runtime/helpers/typeof.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50577" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/scripts.js"], null)
//# sourceMappingURL=/scripts.cd665a19.js.map