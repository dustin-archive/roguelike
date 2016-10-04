var geometry = require('./components/geometry')
var key = require('./components/key')

var map = null
var entities = []
var player = null

var Tile = {
  presets: {
    '#': {
      name: 'wall',
      color: 'darkslategray'
    },
    '.': {
      name: 'floor',
      sprite: ' ', // No dots!
      walkable: true
    },
    '+': {
      name: 'door',
      color: 'brown'
    }
  },
  preset: null,
  sprite: null,
  color: null,
  walkable: false,
  use: function(preset) {
    var x = this.preset = preset || this.preset // Default to currently selected preset
    if (x) {
      preset = this.presets[x]
      this.sprite = x
      for (var attribute in preset) {
        this[attribute] = preset[attribute]
      }
    }
    return this
  },
  pack: function() {
    return {
      sprite: this.sprite,
      color: this.color
    }
  }
}

var Element = {
  sprite: null,
  color: null,
  pos: null,
  pack: function() {
    return {
      sprite: this.sprite,
      color: this.color
    }
  }
}

var Entity = Object.create(Element) // Element with health, movement and looping
Entity.health = 1
Entity.move = function (dx, dy) { // Relative movement
  var direction = geometry.Vector.resolve(dx, dy)
  var target = this.pos.added(direction)
  var target_tile = map[target.y * MAP_WIDTH + target.x]
  if (target_tile.walkable)
    this.pos.set(target)
}
Entity.spawn = function (x, y) {
  this.pos = new geometry.Vector(x, y)
  entities.push(this)
}

var Player = Object.create(Entity)
Player.sprite = '@'
Player.spawn = function (x, y) {
  Entity.spawn.apply(this, arguments)
  return this
}

var MAP_WIDTH  = 9
var MAP_HEIGHT = 9

new Vue({
  el: '#app',
  data: {
    map: map,
    player: player,
    entities: entities
  },
  methods: {
    mapName: function () {

    },
    update: function () {
      // var replica = []
      // this.view.some(function (tile, index) {
      //   x = index % MAP_WIDTH
      //   y = (index - x) / MAP_WIDTH
      //   if (!replica[y])
      //     replica[y] = ""
      //   replica[y] += tile.sprite
      // });
      // this.view = this.view
    },
    generate_map: function () {
      map = []
      for (var y = 0, ymax = MAP_HEIGHT, ymid; y < ymax; y++) {
        ymid = Math.floor(ymax / 2)
        for (var x = 0, xmax = MAP_WIDTH, xmid; x < xmax; x++) {
          xmid = Math.floor(xmax / 2)
          var char = '.' // Floor tile representation; they won't actually be dots
          var tile
          if (x == 0 || y == 0 || x == xmax-1 || y == ymax-1) { // If we're on the edge
            char = '#' // Wall tile
            if (x == xmid || y == ymid) { // If we're in the middle
              char = '+' // Door tile
            }
          }
          tile = Object.create(Tile).use(char)
          map.push(tile) // Grid is one-dimensional so we don't need rows
        }
      }
    }
  },
  computed: {
    // this will eventually generate the entire world and call all the methods to modify it
    // everything will be routed through this property
    view: function () {
      if (!this.map) {
        this.generate_map() // generate map if not available
      }
      if (!this.player) {
        this.player = Object.create(Player).spawn(Math.floor(MAP_WIDTH / 2), Math.floor(MAP_HEIGHT / 2))
      }
      var view = []
      for (var i = 0, imax = map.length; i < imax; i++) {
        var tile = map[i]
        var x = i % MAP_WIDTH
        var y = (i - x) / MAP_WIDTH
        var pos = new geometry.Vector(x, y)
        for (var j = 0, jmax = this.entities.length; j < jmax; j++) {
          var entity = this.entities[j]
          if (entity.pos.equals(pos)) {
            tile = entity
            break
          }
        }
        view.push(tile.pack())
      }

      // TODO: generate the whole world and return it as an array
      return view
    }
  },
  mounted: function () {
    var that = this
    key.init()
    key.down(function (event) {
      var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      var index = key.ARROWS.indexOf(event.keyCode)
      if (index !== -1) {
        that.player.move(directions[index])
        that.update()
      }
    })
  },
  mixins: [
    require('./mixins/badguys')
  ],
  components: {
    game: require('./components/game'),
    hud: require('./components/hud'),
    gradient: require('./components/gradient'),
    mini: require('./components/mini')
  }
})
