
# world array structure
+ this is a computed property

world: [
  [ // this is the layer (z)
    [ // this is a row (y)
      { sprite: '', walkable: true, } // this is one block (x)
      { sprite: '', walkable: true, }
      { sprite: '', walkable: true, }
    ],
    [],
    [],
  ],
  [],
  [],
],

# element array structure
+ this is a computed property

entities: [
  { id: 1, sprite: 'w', health: 10, stamina: 2, coordinates: { x: 0, y: 0, z: 0 },
  { id: 2, sprite: 'D', health: 10, stamina: 2, coordinates: { x: 13, y: 2, z: 0 }
],

# world sprites / blocks
wall: #
floor: . (this is just a representation; actually shows up onscreen as &middot;)
door: `+` (closed) and `/` (open)

unused:
□ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ◧ ◨ ◩ ◪ ◫ ◰ ◱ ◲ ◳

# world entities
@ player
