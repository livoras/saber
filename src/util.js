define(function(require) {
  var config = require('./config')

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
  function log() {
  }

  function warn() {
  }

  function error() {
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
      log('Loaded ' + moduleName)
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

  function resolveTemplatePath(kind) {
    return config.baseWidgetPath + '/' + kind + '/' + kind + '.html'
  }

  function resolveStylePath(kind) {
    return config.baseWidgetPath + '/' + kind + '/' + kind + '.css'
  }

  function resolveViewModelPath(kind) {
    return config.baseWidgetPath + '/' + kind + '/' + kind
  }

  /**
   * to comment
   */
  function inherit (superClass, subClass) {
    var Fn = function () {};
    Fn.prototype = superClass.prototype;

    var proto = subClass.prototype = new Fn;
    proto.constructor = superClass;
    proto._super_ = superClass;
  };


  return {
    type: type,
    load: load,
    resolveStylePath: resolveStylePath,
    resolveTemplatePath: resolveTemplatePath,
    resolveViewModelPath: resolveViewModelPath,
    inherit: inherit
  }

})