define(function(require) {
  var config = require('./config')
  var EventEmitter = require('eventemitter')

  /**
   * to comment
   */
  function toString(obj) {
    return Object.prototype.toString.apply(obj)
  }

  /**
   * to comment
   */
  function type(obj) {
    var typeStr = toString(obj).replace(/\[object\s|\]/g, '')
    return typeStr[0].toLowerCase() + typeStr.slice(1)
  }

  /**
   * to comment
   */
  var hasConsole = 'console' in window
  function log() {
    if(hasConsole && config.debug) {
      try {
        console.log.apply(console, ['Saber Debug:', arguments])
      } catch (ignore) {}
    }
  }

  function warn() {
    if(hasConsole && config.debug) {
      try {
        console.warn.apply(console, ['Saber Warn:', arguments])
      } catch (ignore) {}
    }
  }

  function error() {
    if(hasConsole && config.debug) {
      try {
        console.error.apply(console, ['Saber Error:', arguments])
      } catch (ignore) {}
    }
  }

  /**
   * to comment
   */
  function noop() {}

  /**
   * 
   */
  function load(moduleName) {
    var dfd = $.Deferred()

    if (isHTML(moduleName)) {
      moduleName = convertToTextModule(moduleName)
    } else if (isStyle(moduleName)) {
      moduleName = convertToCSSModule(moduleName)
    }

    require([moduleName], function(loadedModule) {
      dfd.resolve(loadedModule)
    })

    return dfd.promise()
  }

  function isHTML(str) {
    return !!str.match(/\.html$/ig)
  }

  function isStyle(str) {
    return !!str.match(/\.css$/ig)
  }

  function convertToTextModule(moduleName) {
    return 'text!' + moduleName
  }

  function convertToCSSModule(moduleName) {
    return 'css!' + moduleName
  }


  /**
   * to comment
   */
  function resolveTemplatePath(kind) {
    return kind + '.html'
  }

  function resolveStylePath(kind) {
    return kind + '.css'
  }

  function resolveViewModelPath(kind) {
    return kind
  }



  /**
   * to comment
   */
  function each(obj, iterator, context) {
    var nativeForEach = [].forEach
    var breaker = {}
    if (obj == null) return
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context)
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return
      }
    } else {
      var keys = _.keys(obj)
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return
      }
    }
  }

  function extend(obj) {
    each([].slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj; 
  }


  /**
   * to comment
   */
  function inherit(superClass, subClass) {
    var Fn = function () {}
    Fn.prototype = superClass.prototype

    var proto = subClass.prototype = new Fn
    proto.constructor = superClass
    proto._super_ = superClass
  }


  return {
    type: type,
    each: each,
    extend: extend,
    load: load,
    log: log,
    error: error,
    warn: warn,
    resolveStylePath: resolveStylePath,
    resolveTemplatePath: resolveTemplatePath,
    resolveViewModelPath: resolveViewModelPath,
    inherit: inherit,
    EventEmitter: EventEmitter,
    emitter: new EventEmitter
  }

})