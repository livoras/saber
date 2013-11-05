define(function(require) {
  var Widget = require('src/widget')

  var Inner = Widget.extend(function(view, settings) {
    this.name = settings.container.name + ' inner'
    this.gender = 'female'
    this.view = view
    this.settings = settings
  })

  return Inner
})