define(function(require) {

  var _ = require('./util')
  var config = require('./config')
  var widgets = {}

  ko.bindingHandlers.widget = {
    init: function(ele, valueAccessor) {
      // do nothing
    },

    // "<div data-bind='widget: {kind: 'widget', container: $data}'>"
    update: function(ele, valueAccessor) {
      var settings = valueAccessor()
      var kind = settings.kind
      var widgetPath = config.baseWidgetPath + '/' + kind + '/'

      var tplPath = widgetPath + _.resolveTemplatePath(kind)
      var stylePath = widgetPath + _.resolveStylePath(kind)
      var widgetViewModelPath = widgetPath + _.resolveViewModelPath(kind)

      var styleDfd = _.load(stylePath)
      var vmDfd = _.load(widgetViewModelPath) 
      var tplDfd = _.load(tplPath) 

      $.when(tplDfd, vmDfd, styleDfd).then(function(tpl, WidgetViewModel) {
        var $dom = $(tpl)
        var dom = $dom.get(0)
        var vm = new WidgetViewModel(dom, settings)

        ko.applyBindings(vm, dom)
        $(ele).append($dom)

        if(_.type(vm.viewAttached) === 'function') {
          vm.viewAttached(dom)
        }

        _.log('Loaded Widget ' + kind)

        _.emitter.emit('template-parsed', { kind: kind, view: dom, viewModel: vm })
        _.emitter.emit('template-parsed:' + kind, { kind: kind, view: dom, viewModel: vm })
      })
    }
  }

  return {
    widgets: widgets
  }
})