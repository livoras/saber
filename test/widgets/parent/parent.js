define(function(require) {
  var Widget = require('src/widget')

  var Parent = Widget.extend(function(view, settings) {
    this.name = 'parent'
  })

  return Parent
})