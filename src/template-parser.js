define(function(require) {

  var _ = require('./util')
  var config = require('./config')
  var events = require('./events')
  var widgetCaches = {}

  ko.bindingHandlers.widget = {
    init: function(ele, valueAccessor) {
      // do nothing
    },

    // "<div data-bind='widget: {kind: 'widget', container: $data}'>"
    update: function(ele, valueAccessor, allBindings, bindingContext) {
      // $ele is the dom which declares using certain widget
      var $ele = $(ele)
      var settings = valueAccessor()
      var kind = settings.kind
      var widgetPath = config.baseWidgetPath + '/' + kind + '/'
      var dataParts = {}

      // set container to settings if not passing it in
      if (!settings.container) {
        settings.container = {}
        events.includeIn(settings.container)
      }

      // For `data-part` funtinality, here will cache all html
      // of dom which has `data-part` attribute
      cachesParts()

      function cachesParts() {
        $parts = $ele.find("[data-part]")
        $parts.each(function(i, part) {
          var $part = $(part)
          var partName = $part.attr('data-part')
          dataParts[partName] = $part.html()
        })
      }

      $ele.html('')

      if(widgetCaches[kind]) { // check if have cache the widget
        var cache = widgetCaches[kind]
        setTimeout(function() {
          parseWidgetAfterAllLoaded(cache.tpl, cache.viewModel, true)
        }, 0)
      } else {
        var tplPath = widgetPath + _.resolveTemplatePath(kind)
        var stylePath = widgetPath + _.resolveStylePath(kind)
        var widgetViewModelPath = widgetPath + _.resolveViewModelPath(kind)
        var styleDfd = _.load(stylePath)
        var vmDfd = _.load(widgetViewModelPath) 
        var tplDfd = _.load(tplPath) 
        $.when(tplDfd, vmDfd).then(parseWidgetAfterAllLoaded)
      }

      function parseWidgetAfterAllLoaded(tpl, WidgetViewModel, fromCache) {
        var $dom = $(tpl)
        var dom = $dom.get(0)
        var vm = new WidgetViewModel(dom, settings)

        if(!fromCache) {
          var cache = widgetCaches[kind] = {}
          cache.tpl = tpl
          cache.viewModel = WidgetViewModel
          _.log('Loaded Widget ' + kind + ' from server')
        } else {
          _.log('Loaded Widget ' + kind + ' from cache')
        }

        vm.$data = vm
        vm.$parent = bindingContext

        ko.applyBindings(vm, dom)
        resolveParts()
        $ele.html($dom)

        if(_.type(vm.viewAttached) === 'function') {
          vm.viewAttached(dom)
        }

        var emitData = { kind: kind, view: dom, viewModel: vm, parts: dataParts, fromCache: fromCache}
        _.emitter.emit('template-parsed', emitData)
        _.emitter.emit('template-parsed:' + kind, emitData)

        function resolveParts() {
          /* resolve data-part */
          for(var partName in dataParts) {
            var dataPartTpl = dataParts[partName]
            var $dataPartDom = $(dataPartTpl)
            var dataPartDom = $dataPartDom.get(0)
            ko.applyBindings(bindingContext, dataPartDom)
            _.log('Parsing data part', partName, bindingContext);
            $dom.find('[data-part="' + partName + '"]').html($dataPartDom)
          }
        }
      }
    }
  }

})