module.exports = (function () {
  var geometry = require('../utils/geometry')
  var random = require('../utils/random')
  return {
    created: function () {

    },
    data: (function () {
      function Tile(map, pos, preset) {
        this.map = map
        this.pos = pos
        this.use(preset)
      }
      Tile.prototype = {
        map: null,       // Current map (global location?)
        pos: null,       // Position (Vector: x, y)
        char: ' ',      // Appearance (formerly `sprite`)
        color: null,     // HTML color
        walkable: false, // Can the player walk on this tile?
        contact: null,   // Preset on contact (for doors)
        preset: null,    // Preset char
        presets: {
          '#': {
            name: 'wall',
            color: 'darkslategray'
          },
          '.': {
            name: 'floor',
            char: '&nbsp;', // No dots!
            walkable: true
          },
          '+': {
            name: 'door',
            color: 'brown',
            contact: '/'
          },
          '/': {
            name: 'door-open',
            color: 'brown',
            walkable: true
          }
        },
        use: function(preset) {
          var x = this.preset = preset || this.preset // Default to currently selected preset
          if (x) {
            preset = this.presets[x]
            this.char = x
            for (var attribute in preset) {
              this[attribute] = preset[attribute]
            }
          }
          return this
        },
        pack: function() {
          return {
            type: this.name,
            char: this.char,
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
        function at(x, y) {
          var pos = new geometry.Vector(x, y).floored()
          return this[pos.y * map.width + pos.x]
        }
        map.generate = function() {
          map.data = []
          var center = map.center.floored()
          var replica = [], nodes = []
          for (var i = 0, imax = map.length; i < imax; i++) {
            var x = i % map.width
            var y = (i - x) / map.width
            var pos = new geometry.Vector(x, y);
            var tile = new Tile(map, pos, '#')
            map.data.push(tile)
            replica.push({
              pos: pos,
              visited: false
            });
            if ((x - 1) % 2 == 0 && (y - 1) % 2 == 0) {
              nodes.push(new geometry.Vector(x, y))
            }
          }
          var start = random.select(nodes) // Start at random node
          var stack = [at.call(replica, start)];
          var tower = [];
          var cell, neighbors, neighbor, dig, here, there
          var directions = [ // Possible movement directions
            [-1, 0],
            [ 1, 0],
            [ 0,-1],
            [ 0, 1]
          ]
          while (stack.length) {
            cell = stack.pop()  // Pop a cell off the stack
            cell.visited = true // Mark this cell as visited
            neighbors = []
            for (var i = 0, imax = directions.length, direction, target, neighbor; i < imax; i++) { // Loop through directions
              direction = new geometry.Vector(directions[i]) // Access Vector methods
              target = cell.pos.added(direction.scaled(2))   // Get new cell position relative to current cell (scale for step)
              if (map.contains(target)) {                    // If target is within map bounds...
                neighbor = at.call(replica, target)          // Get new tile (neighbor)
                if (!neighbor.visited) {                     // If neighbor is unvisited...
                  neighbors.push(neighbor)                   // Add neighbor to list
                }
              }
            }
            if (neighbors.length) {               // If we can dig further...
              neighbor = random.select(neighbors) // Select a random neighbor
              here = cell.pos.clone() // We need to clone so we don't alter the cell's actual position
              there = neighbor.pos    // The target is the neighbor's position
              dig = there.subtracted(here).normalized() // Get actual step direction
              while (!here.equals(there)) { // While we're not there yet...
                here.add(dig)               // Go there!
                map.at(here).use('.')       // Let's dig (change walls to tiles) on our way.
              }
              stack.push(neighbor)          // Add neighbor to stack for further digging.
              tower.push(neighbor)          // Add neighbor to tower for backtracking.
            } else { // We've hit a dead end!
              if (dig) { // If we were just digging (e.g. we just hit a dead end for the first time)
                neighbors = []
                for (var i = 0, imax = directions.length, direction, target, neighbor; i < imax; i++) { // Loop through directions
                  direction = new geometry.Vector(directions[i]) // Access Vector methods
                  target = cell.pos.added(direction)             // Get new cell position relative to current cell (scale for step)
                  if (map.edge(target)) {                        // If target is on map bounds...
                    neighbor = at.call(replica, target)          // Get new tile (neighbor)
                    if (!neighbor.visited) {                     // If neighbor is unvisited...
                      neighbors.push(neighbor)                   // Add neighbor to list
                    }
                  }
                }
                if (neighbors.length) {
                  neighbor = random.select(neighbors) // Select a random neighbor
                  map.at(neighbor.pos).use('+')           // Make a door there.
                }
                dig = null // Prevent creating doors as we backtrack
              }
              var top = tower.pop();      // Backtrack
              top && stack.push(top)
            }
          }
          spawn = map.at(start)
          spawn.use('.')
          return spawn // Provide player spawn
        }
        map.at = function(x, y) {
          return at.call(this.data, x, y)
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
