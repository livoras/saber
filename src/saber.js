define(function(require) {
  var config = require('./config')
  var util = require('./util')
  var router = require('./router')
  var Widget = require('./Widget')
  var saber = {}

  require('./template-parser')

  saber.config = function(configuration) {
    util.extend(config, configuration)
  }

  saber.init = function() {
    this.$host = config.$host = $(config.widgetHost)
    return saber
  }

  saber.router = router
  saber.util = util
  saber.Widget = Widget
  saber.configuration = config

  return saber
  
})