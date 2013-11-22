//heavily borrowed from backbone events, augmented by signals.js, added a little of my own code, cleaned up for better readability
define(function (require) {
  var EventEmitter = require('eventemitter')

  function includeIn(obj) {
    if (!obj) return 

    var emitter = new EventEmitter

    obj.on = function () {
      emitter.on.apply(emitter, arguments)
    }

    obj.off = function () {
      emitter.off.apply(emitter, arguments)
    }

    obj.once = function () {
      emitter.once.apply(emitter, arguments)
    }

    obj.trigger = obj.emit = function () {
      emitter.emit.apply(emitter, arguments)
    }

    obj.onAny = function () {
      emitter.onAny.apply(emitter, arguments)
    }

    obj.offAny = function () {
      emitter.offAny.apply(emitter, arguments)
    }

    obj.many = function () {
      emitter.many.apply(emitter, arguments)
    }

    obj.setMaxListeners = function () {
      emitter.setMaxListeners.apply(emitter, arguments)
    }

  }

  return {
    includeIn: includeIn
  }

});