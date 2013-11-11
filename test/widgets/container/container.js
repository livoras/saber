define(function(require) {
  var Widget = require('src/widget')

  var Container = Widget.extend(function(view, settings) {
    this.name = 'container'
  })

  return Container
})