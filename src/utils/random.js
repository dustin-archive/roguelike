// Placeholder random number generator
module.exports = (function() {
  function generate() {  // Generate pseudo-random floating point number between 0.0 and 1.0
    return Math.random() // Placeholder, needs seed
  }
  return {
    generate: generate,
    select: function(array) { // Select random element from array
      return array[Math.floor(generate() * array.length)]
    }
  }
})()
