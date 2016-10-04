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

    badguys: []
  },
  methods: {
    mapName: function () {

    },
    update: function () {
      // there's a better way to update the map than this - we'll do it in the world computed property
      var map = this.neutral;
      this.neutral = map;
    },
    generate_badguys: function () {
      // generate code here

      this.badguys = null // replace null with an array of objects

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
    },

    behavior_badguys: function () {
      // if player is within x radius move postition of badguy 1 block closer to player
      // if touching player, attack player
      // upon death of baguy remove badguy from badguys array
    }
  },
  computed: {
    // this will eventually generate the entire world and call all the methods to modify it
    // everything will be routed through this property
    world: function () {
      // this is basically garbage if the world generator is going to do this for us
      // i'm only putting it here because the world generator doesn't exist yet
      var start = [
        '#', '#', '#', '#', '+', '#', '#', '#', '#',
        '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
        '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
        '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '+',
        '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
        '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#',
        '#', '#', '#', '#', '+', '#', '#', '#', '#'
      ]
      var world = start // once the world generator exists this should be an array and start variable should be deleted




      // # Makin' Badguys

      // if there's no bad guys make some badguys
      if (!this.badguys) this.generate_badguys()

      // every time this.badguys gets updated it will render changes to the world
      var badguys = this.badguys

      // merge the bad guys into the world
      // insert code for merging the badguys into the world
      // ...






      // TODO: generate the whole world and return it as an array
      return world
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
