module.exports = {
  data: {
    badguys: []
  },
  methods: {
    generate_badguys: function () {
      var amount = 1000


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
  }
}
