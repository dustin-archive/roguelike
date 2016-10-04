(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Display code
module.exports = (function () {
  var instance

  function init(callback) {
    instance = new Vue({
      el: '#app',
      data: {

        player: {
          health: 100,
          level: 0, // start in a neutral room
          location: { x: 0, y: 0, z: 0 },
        },

        // default world layer
        neutral: [
          '#', '#', '#', '#', '+', '#', '#', '#', '#',
          '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
          '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
          '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '+',
          '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
          '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
          '#', '#', '#', '#', '+', '#', '#', '#', '#'
        ],

        // this is temporary data (more like a story to me)
        entities: [
          {
            id: 1,
            sprite: '@', // goodguy greg yay :D ggg (aka gennady gennadyevich golovkin)
            bind: 'player'
          },
          {
            id: 2,
            sprite: 'w', // badguy bruce boo :C bbb
            location: {
              x: 2,
              y: 2,
              z: 0
            },
            health: 1000,
            stamina: 40
          }
        ],
      },
      methods: {
        mapName: function () {

        },
        update: function () {
          var map = this.neutral;
          this.neutral = map;
        }
      },
      computed: {},
      mounted: function () {
        callback && callback.call(this);
      },
      components: {
        game: {
          template: "<div class='grid'><div class='tile' v-for='item in neutral'>{{ item }}</div></div>",
          props: ['neutral']
        },
        hud: {
          data: function () {
            props: ['player.health']
          }
        },
        gradient: {
          data: function () {
            props: ['distance']
          }
        },
        mini: {
          data: function () {
            props: ['player.pos']
          }
        }
      }
    })
  }

  return {
    init: init,
    instance: instance
  }
})()

},{}],2:[function(require,module,exports){
(function () {
  var geometry = require('./geometry'), // Geometry boilerplate
      key      = require('./key'),      // Key input boilerplate
      display  = require('./display'),  // Display code
      game     = require('./game')      // Game logic
  display.init()
})()

},{"./display":1,"./game":3,"./geometry":4,"./key":5}],3:[function(require,module,exports){
// Game logic
module.exports = (function () {
  var MAP_SIZE = [9, 9]

  var game = {

  }

  var player = {

  }

  var element = {
    
  }

  function init() {

  }

  return {
    init: init,
    player: player
  }
})

},{}],4:[function(require,module,exports){
// Vectors and rectangles
module.exports = (function(){
  function Vector(x, y){
    var o = Vector.resolve(x, y);
    this.x = o.x;
    this.y = o.y;
  }

  Vector.resolve = function(x, y) {
    if (typeof y === "undefined") {
      var t = typeof x;
      if (t === "undefined") {
        throw "Warning: Vector received undefined arguments!";
      } else if (x instanceof Vector) {
        y = x.y;
        x = x.x;
      } else if (x.constructor.name === "Array") {
        y = x[1];
        x = x[0];
      } else if (t === "number") {
        y = 0;
      }
    }
    return {x: x, y: y};
  }

  Vector.unpack = function(value) {
    var values = value.split(",");
    return new Vector(parseFloat(values[0]), parseFloat(values[1]));
  }

  Vector.prototype = {
    resolve:    Vector.resolve,
    add:        function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      this.x += x;
      this.y += y;
      return this;
    },
    added:      function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      return new Vector(this.x + x, this.y + y);
    },
    subtract:   function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      this.x -= x;
      this.y -= y;
      return this;
    },
    subtracted: function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      return new Vector(this.x - x, this.y - y);
    },
    multiply: function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      this.x *= x;
      this.y *= y;
      return this;
    },
    multiplied: function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      return new Vector(this.x * x, this.y * y);
    },
    divide: function(x, y) {
      o = Vector.resolve(x, y);
      this.x /= o.x;
      this.y /= o.y;
      return this;
    },
    divided: function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      return new Vector(this.x / x, this.y / y);
    },
    dot: function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      return this.x * x + this.y * y;
    },
    normalize: function() {
      var m = this.magnitude();
      if (!m) return this;
      return this.scale(1 / m);
    },
    normalized: function() {
      var m = this.magnitude();
      if (!m) return this;
      return this.scaled(1 / m);
    },
    magnitude: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    clone: function() {
      return new Vector(this.x, this.y);
    },
    set: function(x, y){
      o = Vector.resolve(x, y);
      this.x = o.x;
      this.y = o.y;
      return this;
    },
    equals: function(x, y){
      if (x === null) return false;
      o = Vector.resolve(x, y);
      return this.x == o.x && this.y == o.y;
    },
    floor : function() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
    },
    floored : function() {
      return new Vector(Math.floor(this.x), Math.floor(this.y));
    },
    round : function() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
    },
    rounded : function() {
      return new Vector(Math.round(this.x), Math.round(this.y));
    },
    scale: function(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    },
    scaled: function(scalar) {
      return new Vector(this.x * scalar, this.y * scalar);
    },
    dotted: function(other) {
      return this.x * other.x + this.y * other.y;
    },
    string: function(){
      return this.x+", "+this.y;
    },
    pack: function() {
      return this.x+","+this.y;
    }
  }

  function Rect(x, y, width, height){
    var pos, size, l = arguments.length;

    if (l == 2){
      pos  = new Vector(x, y);
      size = new Vector(width, height);
    } else if (l == 1){
      pos  = new Vector(0, 0);
      size = new Vector(x);
    } else {
      pos = x;
      size = y;
    }

    this.pos = pos;
    this.size = size;

    var property, obj;

    for (property in this.properties) {
      obj = this.properties[property];
      Object.defineProperty(this, property, obj);
    }
  }

  Rect.prototype = {
    properties: {
      "left": {
        get: function(){
          return this.pos.x;
        },
        set: function(value){
          this.pos.x = value;
        }
      },
      "right": {
        get: function(){
          return this.pos.x + this.size.x;
        },
        set: function(value){
          this.pos.x = value - this.size.x;
        }
      },
      "top": {
        get: function(){
          return this.pos.y;
        },
        set: function(value){
          this.pos.y = value;
        }
      },
      "bottom": {
        get: function(){
          return this.pos.y + this.size.y;
        },
        set: function(value){
          this.pos.y = value - this.size.y;
        }
      },
      "x": {
        get: function(){
          return this.pos.x;
        },
        set: function(value){
          this.pos.x = value;
        }
      },
      "y": {
        get: function(){
          return this.pos.y;
        },
        set: function(value){
          this.pos.y = value;
        }
      },
      "width": {
        get: function(){
          return this.size.x;
        },
        set: function(value){
          this.size.x = value;
        }
      },
      "height": {
        get: function(){
          return this.size.y;
        },
        set: function(value){
          this.size.y = value;
        }
      },
      "center": {
        get: function(){
          return new Vector(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
        },
        set: function(value){
          this.pos.x = value.x - this.size.x / 2;
          this.pos.y = value.y - this.size.y / 2;
        }
      }
    },
    added:      function(x, y) {
      o = Vector.resolve(x, y);
      x = o.x;
      y = o.y;
      return new Rect(this.pos.x + x, this.pos.y + y, this.size.x, this.size.y);
    },
    clone:      function() {
      return new Rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    },
    set:        function(x, y, width, height) {
      if (x instanceof Rect) {
        this.pos.x  = x.pos.x;
        this.pos.y  = x.pos.y;
        this.size.x = x.size.x;
        this.size.y = x.size.y;
        return;
      }
      this.pos.x = x;
      this.pos.y = y;
      this.size.x = width;
      this.size.y = height;
    },
    intersects: function(other) {
      if (other instanceof Vector) {
        return this.left < other.x && this.right > other.x && this.top < other.y && this.bottom > other.y;
      } else if (other instanceof Rect) {
        return this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top;
      } else {
        return false;
      }
    },
    contains: function(other) {
      if (other instanceof Vector) {
        return other.x > this.left && other.x < this.right && other.y > this.top && other.y < this.bottom;
      } else if (other instanceof Rect) {
        return other.left > this.left && other.right < this.right && other.top > this.top && other.bottom < this.bottom;
      } else {
        return false;
      }
    },
    string: function(){
      return this.left+" -> "+this.right+", "+this.top+" -> "+this.bottom;
    }
  };

  function Circle(pos, radius) {
    this.pos = pos;
    this.radius = radius;
    this.mass = radius;
    this.velocity = new Vector(0, 0);

    var property, obj;

    for (property in this.properties) {
      obj = this.properties[property];
      Object.defineProperty(this, property, obj);
    }
  }

  Circle.unpack = function(data) {
    var circle = new Circle(Vector.unpack(data.pos), data.radius);
    circle.mass = data.mass;
    circle.velocity = Vector.unpack(data.velocity);
    return circle;
  };

  Circle.prototype = {
    properties: {
      "left": {
        get: function(){
          return this.pos.x - this.radius;
        },
        set: function(value){
          this.pos.x = value + this.radius;
        }
      },
      "right": {
        get: function(){
          return this.pos.x + this.radius;
        },
        set: function(value){
          this.pos.x = value - this.radius;
        }
      },
      "top": {
        get: function(){
          return this.pos.y - this.radius;
        },
        set: function(value){
          this.pos.y = value + this.radius;
        }
      },
      "bottom": {
        get: function(){
          return this.pos.y + this.radius;
        },
        set: function(value){
          this.pos.y = value - this.radius;
        }
      },
      "x": {
        get: function(){
          return this.pos.x;
        },
        set: function(value){
          this.pos.x = value;
        }
      },
      "y": {
        get: function(){
          return this.pos.y;
        },
        set: function(value){
          this.pos.y = value;
        }
      },
      "diameter": {
        get: function(){
          return this.radius * 2;
        },
        set: function(value){
          this.radius = value / 2;
        }
      },
      "center": {
        get: function(){
          return this.pos;
        },
        set: function(value){
          this.pos.set(value);
        }
      },
      "rect": {
        get: function(){
          return new Rect(this.pos.x - this.radius, this.pos.y - this.radius, this.radius * 2, this.radius * 2);
        },
        set: function(value){
          this.pos = value.center.clone();
          this.radius = (value.width + value.height) / 4;
        }
      }
    },
    pack: function() {
      return {
        pos: this.pos.pack(),
        radius: this.radius,
        velocity: this.velocity.pack(),
        mass: this.mass
      };
    },
    intersects: function(other) {
      var d, m;
      if (other.rect.intersects(this.rect)) {
        d = other.rect.center.subtracted(this.rect.center);
        m = this.radius + other.radius;
        return d.x * d.x + d.y * d.y < m * m;
      }
    },
    respond: function(other) {
      var d, m, n, t, c, sna, snb, sta, stb, sa, sb, snaa, snab, staa, stab;
      d = other.pos.subtracted(this.pos); // Distance between two circles
      m = other.pos.added(this.pos).scaled(.5);
      n = d.normalized(); // Vector normal
      t = new Vector(-n.y, n.x); // Tangent
      sna = n.dotted(this.velocity);
      snb = n.dotted(other.velocity);
      sta = t.dotted(this.velocity);
      stb = t.dotted(other.velocity);
      sa = (sna * (this.mass - other.mass) + 2 * other.mass * snb) / (this.mass + other.mass);
      sb = (snb * (other.mass - this.mass) + 2 * this.mass * sna) / (other.mass + this.mass);
      snaa = n.scaled(sa);
      snab = n.scaled(sb);
      staa = t.scaled(sta);
      stab = t.scaled(stb);
      this.velocity = staa.added(snaa); // Resulting velocities
      other.velocity = stab.added(snab);

      c = new Vector((this.pos.x * other.radius + other.pos.x * this.radius) / (this.radius + other.radius), (this.pos.y * other.radius + other.pos.y * this.radius) / (this.radius + other.radius)); // Point of collision

      this.pos = c.subtracted(n.scaled(this.radius + 1)); // Addition of 1 avoids circles getting stuck
      other.pos = c.added(n.scaled(other.radius));

      return this;
    },
    collide: function(other) {
      if (other.intersects(this)) {
        this.respond(other);
      }
    }
  };

  return {
    Vector: Vector,
    Rect: Rect,
    Circle: Circle
  };
})();

},{}],5:[function(require,module,exports){
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

},{}]},{},[2])