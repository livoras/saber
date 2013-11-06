define(function(require) {

  var util = require('./util')
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

      var tplPath = widgetPath + util.resolveTemplatePath(kind)
      var stylePath = widgetPath + util.resolveStylePath(kind)
      var widgetViewModelPath = widgetPath + util.resolveViewModelPath(kind)

      var styleDfd = util.load(stylePath)
      var vmDfd = util.load(widgetViewModelPath) 
      var tplDfd = util.load(tplPath) 

      $.when(tplDfd, vmDfd, styleDfd).then(function(tpl, WidgetViewModel) {
        var $dom = $(tpl)
        var dom = $dom.get(0)
        var vm = new WidgetViewModel(dom, settings)

        ko.applyBindings(vm, dom)
        $(ele).append($dom)

        if(util.type(vm.viewAttached) === 'function') {
          vm.viewAttached(dom)
        }

        // Code below is just used for BDD test
        widgets[kind] = { kind: kind, view: dom, viewModel: vm }
      })
    }
  }

  return {
    widgets: widgets
  }
})