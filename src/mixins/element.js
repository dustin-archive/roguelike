module.exports = (function(){
  var geometry = require('../utils/geometry')
  var elements = []
  var Element = {
    char: null,
    color: null,
    type: null,
    map: null,
    pos: null,
    pack: function() {
      return {
        char: this.char,
        color: this.color
      }
    },
    spawn: function (tile) {
      this.map = tile.map
      this.pos = tile.pos.floored()
      elements.push(this)
      return this
    }
  }
  var Entity = Object.create(Element) // Element with health, movement and looping
  Entity.health = 1
  Entity.name = null
  Entity.pack = function() {
    return {
      char: this.char,
      color: this.color,
      type: this.type
    }
  }
  Entity.move = function (dx, dy) { // Relative movement
    var direction = geometry.Vector.resolve(dx, dy)
    var target = this.pos.added(direction)
    var target_tile = this.map.at(target)
    if (target_tile) {
      if (target_tile.walkable) {
        this.pos.set(target)
        return true;
      } else if(target_tile.contact) {
        target_tile.use(target_tile.contact)
      }
    }
    return false;
  }

  var Player = Object.create(Entity)
  Player.char = '@'
  Player.color = 'white'
  Player.type = 'player'
  Player.name = 'dust'

  return {
    data: {
      elements: elements,
      Element: Element,
      Entity: Entity,
      Player: Player
    }
  }
})()
