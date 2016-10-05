module.exports = (function () {
  var geometry = require("../utils/geometry")
  return {
    created: function () {

    },
    data: (function () {
      function Tile(preset) {
        this.use(preset)
      }
      Tile.prototype = {
        id: null,
        sprite: null,
        color: null,
        walkable: false,
        preset: null,
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
      var Map = (function () {
        var that = this
        var map = Object.create(geometry.Rect.prototype)
        geometry.Rect.call(map, [9, 9])
        map.length = map.width * map.height
        map.data = []
        map.generate = function() {
          this.data = []
          var center = map.center.floored()
          for (var i = 0, imax = this.length; i < imax; i++) {
            var tile = null;
            var x = i % map.width
            var y = (i - x) / map.width
            var sprite = '.'
            if (map.edge(x, y)) {
              sprite = x == center.x || y == center.y ? '+' : '#'
            }
            tile = new Tile(sprite)
            this.data.push(tile)
          }
          return this
        }
        map.at = function(x, y) {
          var pos = geometry.Vector.resolve(x, y)
          return this.data[pos.y * this.width + pos.x]
        }
        return map
      })()
      return {
        Tile: Tile,
        Map: Map
      }
    })(),
    methods: {

    }
  }
})()
