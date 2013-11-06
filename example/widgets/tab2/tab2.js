define(function(require) {
  var Widget = require('src/widget')

  var Sample = Widget.extend(function(view, settings) {
    this.slogan = 'Stupid Tab 2'
  })

  return Sample
})