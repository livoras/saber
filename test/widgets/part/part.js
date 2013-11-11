define(function(require) {
  var Widget = require('src/widget')

  var Part = Widget.extend(function(view, settings) {
    this.name = 'part'
  })

  return Part
})