define(function(require) {
  var Widget = require('src/widget')

  function Inner(view, settings) {
    this.name = settings.container.name + ' inner'
    this.gender = 'female'
    this.view = view
    this.settings = settings
  }

  return Inner
})