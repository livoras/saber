define(function (require) {
  var EventEmitter = require('eventemitter')
  var _ = require('./util')

  function includeIn(obj) {
    if (!obj) return 

    var emitter = new EventEmitter
    var proxies = [
      'on', 'off', 'once', 
      'emit', 'onAny', 'many', 
      'offAny', 'setMaxListeners'
    ]

    _.each(proxies, function(proxy) {
      obj[proxy] = function() {
        emitter[proxy].apply(emitter, arguments)
      } 
    })

    obj.trigger = function() {
      emitter.emit.apply(emitter, arguments)
    }

    return obj
  }

  return {
    includeIn: includeIn
  }

});