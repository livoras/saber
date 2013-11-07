define(function(require) {
  var Widget = require('src/widget')

  var Mask = Widget.extend(function(view, settings) {
    var _this = this
    this.ips = ko.observableArray(['hello', 'Jerry', 'kuangweike'])
    this.add = function() {
      _this.ips.push($('#content').val())
    }
  })

  Mask.prototype.viewAttached = function(view) {
  }

  return Mask
})