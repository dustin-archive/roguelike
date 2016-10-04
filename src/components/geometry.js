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
