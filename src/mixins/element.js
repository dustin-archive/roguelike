module.exports = (function(){
  var geometry = require('../utils/geometry')
  var elements = []
  var Element = {
    sprite: null,
    color: null,
    map: null,
    pos: null,
    pack: function() {
      return {
        sprite: this.sprite,
        color: this.color
      }
    },
    spawn: function (map, x, y) {
      this.map = map
      this.pos = new geometry.Vector(x, y).floored()
      elements.push(this)
      return this
    }
  }
  var Entity = Object.create(Element) // Element with health, movement and looping
  Entity.health = 1
  Entity.move = function (dx, dy) { // Relative movement
    var direction = geometry.Vector.resolve(dx, dy)
    var target = this.pos.added(direction)
    var target_tile = this.map.at(target)
    if (target_tile.walkable)
      this.pos.set(target)
  }

  var Player = Object.create(Entity)
  Player.sprite = '@'

  return {
    data: {
      elements: elements,
      Element: Element,
      Entity: Entity,
      Player: Player
    }
  }
})()
