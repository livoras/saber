define(function(require) {
  var EventEmitter = require('eventemitter')
  var util = require('./util')
  var events = require('./events')

  function Widget(arguments) {
    events.includeIn(this)
  }

  Widget.extend = function(SubWidget) {
    var SuperWidget = this

    function WidgetInner() {
      SuperWidget.apply(this, arguments)
      SubWidget.apply(this, arguments)
    }

    util.inherit(SuperWidget, WidgetInner)

    WidgetInner.extend = function () {
      return Widget.extend.apply(WidgetInner, arguments)
    }

    return WidgetInner
  }

  return Widget
})