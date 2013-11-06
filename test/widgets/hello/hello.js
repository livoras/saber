define(function(require) {
  var Widget = require('src/widget')

  var Sample = Widget.extend(function(view, settings) {
    this.slogan = 'Hello Sample'
  })

  return Sample
})