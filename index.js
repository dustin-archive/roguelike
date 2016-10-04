new Vue({
  el: '#app',
  data: {
    test: 'hello world!',

		health: 100,
		level: 0, // start in a neutral room
    coordinates: { x: 0, y: 0, z: 0 },

    // default world layer
    neutral: [
      '■ ■ ■ ■ - ■ ■ ■ ■',
      '■               ■',
      '■               ■',
      '|       @       |',
      '■               ■',
      '■               ■',
      '■ ■ ■ ■ - ■ ■ ■ ■'
    ],

		entities: [
			{id: 1, coordinates: { x: 0, y: 0, z: 0 }}
		]
  },
  methods: {
    nameMaker: function () {

    }
  },
  computed: {
    world: function () {
      return null
    }
  },
  components: {
    hud: {
      data: function () {
        props: ['health']
      }
    },
    gradient: {
      data: function () {
        props: ['distance']
      }
    },
    mini: {
      data: function () {
        props: ['coordinates']
      }
    }
  }
})
