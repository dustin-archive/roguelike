module.exports = {
  template: "<div class='grid'><div class='tile' v-for='tile in view' v-bind:style='{color: tile.color}'>{{ tile.sprite }}</div></div>",
  props: ['view']
}
