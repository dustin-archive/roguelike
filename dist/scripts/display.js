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

},{}]},{},[1])