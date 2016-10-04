new Vue({
  el: '#app',
  data: {

    player: {
      health: 100,
      level: 0, // start in a neutral room
      location: { x: 0, y: 0, z: 0 },
    },

    // default world layer
    // I commented this out because we're going to work on the world generator next which will make this useless
    // neutral: [
    //   '#', '#', '#', '#', '+', '#', '#', '#', '#',
    //   '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
    //   '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
    //   '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '+',
    //   '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
    //   '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
    //   '#', '#', '#', '#', '+', '#', '#', '#', '#'
    // ],

    entities: []
  },
  methods: {
    mapName: function () {

    },
    update: function () {
      // there's a better way to update the map than this - we'll do it in the world computed property
      var map = this.neutral;
      this.neutral = map;
    },
    generate_entities: function () {
      // generate code here

      this.entities = null // replace null with an array of objects

      // this will be the structure of the generated code
      // this is temporary data (more like a story to me)
      // entities: [
      //   {
      //     id: 1,
      //     sprite: '@', // goodguy greg yay :D ggg (aka gennady gennadyevich golovkin)
      //     bind: 'player'
      //   },
      //   {
      //     id: 2,
      //     sprite: 'w', // badguy bruce boo :C bbb
      //     location: {
      //       x: 2,
      //       y: 2,
      //       z: 0
      //     },
      //     health: 1000,
      //     stamina: 40
      //   }
      // ],
    }
  },
  computed: {
    // this will eventually generate the entire world and call all the methods to modify it
    // everything will be routed through this property
    world: function () {
      // TODO: generate the whole world and return it as an array
      return [
        '#', '#', '#', '#', '+', '#', '#', '#', '#',
        '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
        '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
        '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '+',
        '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
        '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
        '#', '#', '#', '#', '+', '#', '#', '#', '#'
      ]
    }
  },
  mounted: function () {
    // if this was somehow self initiating the vue instance we don't need it
    // callback && callback.call(this);
  },
  components: {
    game: require('components/game'),
    hud: require('components/hud'),
    gradient: require('components/gradient'),
    mini: require('components/mini')
  }
})
