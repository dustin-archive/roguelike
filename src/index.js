var geometry = require('./utils/geometry')
var key = require('./utils/key')

new Vue({
  el: '#app',
  data: {
    map: null,
    player: null,
    initialized: false
  },
  computed: {
    view: function () { // Flatten map data on get
      if (this.initialized) {
        var view = []
        for (var i = 0, imax = this.map.length; i < imax; i++) {
          var tile = this.map.data[i]
          var x = i % this.map.width
          var y = (i - x) / this.map.height
          var pos = new geometry.Vector(x, y)
          for (var j = 0, jmax = this.elements.length; j < jmax; j++) {
            var entity = this.elements[j]
            if (entity.pos.equals(pos)) {
              tile = entity
              break
            }
          }
          view.push(tile.pack())
        }
        return view
      }
    }
  },
  mounted: function () {
    var spawn, that = this
    this.map = Object.create(this.Map)
    spawn = this.map.generate()
    this.player = Object.create(this.Player).spawn(spawn)
    key.init()
    key.down(function (event) {
      var code = event.keyCode || event.which;
      var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      var index = key.ARROWS.indexOf(code)
      if (index !== -1) {
        if (!that.player.move(directions[index])) { // Move, return movement success
          key.up(code);
        }
      }
    })
    this.initialized = true
  },
  mixins: [
    require('./mixins/element'),
    require('./mixins/map')
  ],
  components: {
    game: require('./components/game'),
    hud: require('./components/hud'),
    gradient: require('./components/gradient'),
    mini: require('./components/mini')
  }
})
