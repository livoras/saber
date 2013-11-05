define(function(require) {
  var Widget = require('src/widget')

  var Fake = Widget.extend(function(view, settings) {
    this.name = 'saber'
    this.view = view
    this.settings = settings
  })

  Fake.prototype.viewAttached = function(view) {
    this.attached = true
    this.view = view
  }

  return Fake
})