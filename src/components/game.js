module.exports = {
  template: "<div class='grid'><div v-for='tile in view' v-html='tile.char' class='tile' :class='[tile.type]' :style='{color: tile.color}'></div></div>",
  props: ['view']
}
