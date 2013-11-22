define(function(require) {
  var Widget = require('src/widget')

  var Sample = Widget.extend(function(view, settings) {
    this.name = 'I Love You Jerry...'
  })

  return Sample
})