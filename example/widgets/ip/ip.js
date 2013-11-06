define(function(require) {
  var Widget = require('src/widget')

  var IP = Widget.extend(function(view, settings) {
    var container = settings.container
    console.log(container.on)
    console.log(container.off)
    this.content = settings.ip
  })

  IP.prototype.viewAttached = function(view) {
    console.log(view)
  }

  return IP
})