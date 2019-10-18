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
})({"dist/scripts.min.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function () {
  var e = document.querySelector(".search-bar__input"),
      t = function () {
    var e = [],
        t = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function n(t) {
      "object" == _typeof(t) ? e.push(t) : console.log("Must be an object");
    }

    return {
      add: n,
      getAll: function getAll() {
        return e;
      },
      loadList: function loadList() {
        return fetch(t).then(function (e) {
          return e.json();
        }).then(function (e) {
          e.results.forEach(function (e) {
            n({
              name: e.name,
              detailsUrl: e.url
            });
          });
        }).catch(function (e) {
          console.error(e);
        });
      },
      loadDetails: function loadDetails(e) {
        var t = e.detailsUrl;
        return fetch(t).then(function (e) {
          return e.json();
        }).then(function (t) {
          e.imageURL = t.sprites.front_default, e.height = t.height, e.types = [], t.types.forEach(function (t) {
            e.types.push(t.type.name);
          });
        }).catch(function (e) {
          console.error(e);
        });
      }
    };
  }();

  function n() {
    var e = document.querySelector(".show-box");
    e.innerText = "", e.parentElement.classList.remove("is-visible");
  }

  function o(e) {
    var t = document.createElement("div"),
        n = document.createElement("h3"),
        o = document.createElement("p");
    return n.innerText = e.name, t.classList.add("show-box__text"), t.appendChild(n), e.types.forEach(function (e) {
      var n = function (e) {
        var t = document.createElement("p");
        return t.innerText = e, t.classList.add("content-list__type"), t.classList.add("content-list__type--".concat(e)), t;
      }(e);

      t.appendChild(n);
    }), o.innerText = "Height: ".concat(e.height, "m"), t.appendChild(o), t;
  }

  function c(e) {
    var t = document.querySelector(".show-box"),
        c = function (e) {
      var t = document.createElement("div"),
          n = document.createElement("img");
      return n.setAttribute("src", e), t.classList.add("show-box__image"), t.appendChild(n), t;
    }(e.imageURL),
        i = o(e),
        s = function () {
      var e = document.createElement("div"),
          t = document.createElement("i");
      return e.classList.add("show-box__close"), t.classList.add("fas"), t.classList.add("fa-times"), e.appendChild(t), e.addEventListener("click", function () {
        n();
      }), e;
    }();

    t.appendChild(s), t.appendChild(c), t.appendChild(i);
  }

  function i(e) {
    var o = document.createElement("button"),
        i = function () {
      var e = document.createElement("div");
      return e.classList.add("content-list__image"), e;
    }(),
        s = function (e) {
      var t = document.createElement("p");
      return t.classList.add("content-list__desc"), t.textContent = e, t;
    }(e.name);

    return o.classList.add("content-list__button"), o.appendChild(i), o.appendChild(s), o.addEventListener("click", function () {
      !function (e) {
        t.loadDetails(e).then(n).then(function () {
          document.querySelector(".show-box-container").classList.add("is-visible"), c(e);
        });
      }(e);
    }), o;
  }

  t.loadList().then(function () {
    var e = document.createElement("div"),
        t = document.querySelector(".content-list");
    e.classList.add("lds-dual-ring"), t.appendChild(e);
  }()).then(function () {
    !function () {
      var e = document.querySelector(".lds-dual-ring");
      e.parentNode.removeChild(e);
    }(), t.getAll().forEach(function (e) {
      !function (e) {
        var t = document.getElementById("pokemon-list"),
            n = i(e),
            o = document.createElement("li");
        o.appendChild(n), t.appendChild(o);
      }(e);
    });
  }), e.addEventListener("keyup", function () {
    var t = e.value.toUpperCase(),
        n = document.querySelector(".scroll-box").getElementsByTagName("li");
    var o, c;

    for (var _e = 0; _e < n.length; _e += 1) {
      (c = (o = n[_e].getElementsByTagName("p")[0]).textContent.toUpperCase()).indexOf(t) > -1 ? n[_e].style.display = "" : n[_e].style.display = "none";
    }
  });
}();
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51472" + '/');

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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dist/scripts.min.js"], null)
//# sourceMappingURL=/scripts.min.fced756c.js.map