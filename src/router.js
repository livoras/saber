define(function(require) {

  var config = require('./config')
  var _ = require('./util')
  var router = {}

  if (!routie) {
    throw new Error('Saber needs routiejs support.')
  }

  var route = router.route = routie
  var maps = {}

  function mapAuto(widgetNames) {
    if (widgetNames === '*' || _.type(widgetNames) === 'undefined') {
      mapAllRoutesToWidgets()
    } else if(_.type(widgetNames) === 'array') {
      _.each(widgetNames, function(widgetName, i) {
        map(widgetName, widgetName)
      })
    }
    return router
  }

  function map(hash, widgetName, callback) {

    if(maps[hash]) {
      unmap(hash)
    }

    maps[hash] = {
      widget: widgetName,
      active: active,
      callback: callback
    }

    // Using named function for removing route rule later
    route(hash, active)

    function active() {
      activeMapping(widgetName, callback)
    }

    return router
  }

  function unmap(hash) {
    var map = maps[hash]
    if (map) {
      route.remove(hash, map.active)
      delete maps[hash]
    } else {
      _.error('Hash ' + hash + ' not found')
    }
  }

  function mapAllRoutesToWidgets() {
    route('*', function() {
      var hash = window.location.hash
      hash = hash.replace(/^#/, '')
      if (hash && !maps[hash]) {
        activeMapping(hash)
      }
    })
  }

  function activeMapping(widgetName, callback) {
    var $widget = $('<div data-bind="widget: {kind:' + "'" + widgetName + "'" + '}">' + '</div>')
    var widgetDom = $widget.get(0)
    ko.applyBindings({}, widgetDom)
    config.$host.html($widget)

    if (_.type(callback) === 'function') {
      callback()
    }

    _.emitter.emit('active-mapping', widgetName, $widget)
    _.emitter.emit('active-mapping:' + widgetName, $widget)

    return router
  }

  router.map = map
  router.unmap = unmap
  router.mapAuto = mapAuto
  router.activeMapping = activeMapping

  return router
})