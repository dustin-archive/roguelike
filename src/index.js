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
    var x = this.preset = preset || this.preset; // Default to currently selected preset
    if (x) {
      preset = this.presets[x];
      this.sprite = x;
      for (var attribute in preset) {
        this[attribute] = preset[attribute];
      }
    }
    return this
  }
}

var Player = {
  pos: null
}

var WORLD_X = 9
var WORLD_Y = 9

new Vue({
  el: '#app',
  data: {
    player: {
      health: 100,
      level: 0, // start in a neutral room
      location: { x: 0, y: 0, z: 0 },
    },
    map: null
  },
  methods: {
    mapName: function () {

    },
    update: function () {
      // there's a better way to update the map than this - we'll do it in the world computed property
      var map = this.neutral
      this.neutral = map
    },
    generate_map: function () {
      this.map = []
      for (var y = 0, ymax = WORLD_Y, ymid; y < ymax; y++) {
        ymid = Math.floor(ymax / 2);
        for (var x = 0, xmax = WORLD_X, xmid; x < xmax; x++) {
          xmid = Math.floor(xmax / 2);
          var char = '.' // Floor tile representation; they won't actually be dots
          var tile;
          if (x == 0 || y == 0 || x == xmax-1 || y == ymax-1) { // If we're on the edge
            char = '#' // Wall tile
            if (x == xmid || y == ymid) { // If we're in the middle
              char = '+' // Door tile
            }
          }
          tile = Object.create(Tile).use(char)
          this.map.push(tile) // Grid is one-dimensional so we don't need rows
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
      var view = []
      for (var i = 0, imax = this.map.length; i < imax; i++) {
        var tile = this.map[i]
        view.push({
          sprite: tile.sprite,
          color: tile.color
        })
      }

      // TODO: generate the whole world and return it as an array
      return view
    }
  },
  mounted: function () {
    // Computed values are accessed before mount! Map cannot be generated here.
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
