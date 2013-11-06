define(function(require) {
  var Widget = require('src/widget')

  var IP = Widget.extend(function(view, settings) {
    var container = settings.container
    this.content = settings.ip
  })

  IP.prototype.viewAttached = function(view) {
  }

  return IP
})