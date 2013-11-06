define(function(require) {
  var Widget = require('src/widget')

  var Mask = Widget.extend(function(view, settings) {
    this.ips = ['hello', 'Jerry', 'kuangweike']
  })

  return Mask
})