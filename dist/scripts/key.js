(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generic boilerplate code for key input
module.exports = (function() {
  var initialized = false;
  var keys = {
    listeners: {
      tap:  [],
      down: [],
      hold: [],
      up:   []
    }
  };
  function assure(code) { // Ensure that a key is registered
    if (!keys[code]) {
      keys[code] = {
        tap:  false,
        down: false,
        up:   false,
        listeners: {
          tap:  [],
          down: [],
          hold: [],
          up:   []
        }
      };
    }
    return keys[code];
  }
  function up(event) {
    var key, code;
    if (event) {
      code = event.keyCode || event;
      if (code) {
        key = keys[code];
        if (key) {
          key.tap = false;
          key.down = false;
          key.up = event.constructor.name === "Number";
          key.listeners.up.some(function(listener) {
            listener.call(window, event);
          });
          clearTimeout(key.holdTimeout);
        }
      } else {
        for (var code in keys) {
          if (code !== "listeners") {
            key = keys[code];
            if (key) {
              key.tap = false;
              key.down = false;
              key.up = true;
              clearTimeout(key.holdTimeout);
            }
          }
        }
      }
    }
  }
  return {
    SPACE: 32,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    init: function() {
      initialized = true;
      document.addEventListener("keydown", function(event) {
        var key;
        key = assure(event.which || event.keyCode);
        if (key) {
          if (!key.up) {
            if (!key.tap) {
              key.listeners.tap.some(function(listener) {
                listener.call(window, event);
              });
              key.tap = true;
            }
            key.down = true;
            key.listeners.down.some(function(listener) {
              listener.call(window, event);
            });
            function hold() {
              key.listeners.hold.some(function(listener) {
                listener.call(window, event);
              });
              if (key.down)
                key.holdTimeout = requestAnimationFrame(hold);
            }
            hold();
            keys.listeners.down.some(function(listener) {
              if (listener)
                listener.call(window, event);
            });
          }
        }
      });
      document.addEventListener("keyup", up);
      return this;
    },
    tap: function(code, callback) {
      var key = assure(code);
      if (callback) {
        key.listeners.tap.push(callback);
        return this;
      } else {
        return null;
      }
    },
    down: function(code, callback) {
      var key = null;
      if (initialized) {
        if (code.constructor.name === "Function") {
          callback = code;
          keys.listeners.down.push(callback);
        } else if (code.constructor.name === "Number") {
          key = assure(code);
          if (callback) {
            key.listeners.down.push(callback);
            return this;
          } else {
            return key.down;
          }
        } else if (typeof code === "undefined") {
          throw "KeyError: First argument of `down` cannot be undefined";
        } else {
          throw "KeyError: First argument of `down` must be of type Function or Number";
        }
      } else {
        throw "KeyError: `key` module must be initialized before calling method `down`";
      }
    },
    hold: function(code, callback) {
      var key = assure(code);
      if (callback) {
        key.listeners.hold.push(callback);
        return this;
      } else {
        return null;
      }
    },
    up: function(code, callback) {
      var key;
      if (arguments.length) {
        if (code.constructor.name === "Number") {
          if (callback) {
            assure(code).listeners.up.push(callback);
            return this;
          } else {
            up(code);
          }
        }
      } else {
        up();
      }
    }
  };
})();

},{}]},{},[1])