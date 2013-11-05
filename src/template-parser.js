define(function(require) {

  var util = require('./util')
  var config = require('./config')
  var widgets = require('./saber').widgets

  ko.bindingHandlers.widget = {
    init: function(ele, valueAccessor) {
      // do nothing
    },
    // "<div data-bind='widget: {kind: 'widget', container: $data}'>"

    update: function(ele, valueAccessor) {
      var settings = valueAccessor()
      var kind = settings.kind
      var tplPath = util.resolveTemplatePath(kind)
      var stylePath = util.resolveStylePath(kind)
      var widgetViewModelPath = util.resolveViewModelPath(kind)
      var styleDfd = util.load(stylePath)
      var vmDfd = util.load(widgetViewModelPath) 
      var tplDfd = util.load(tplPath) 

      $.when(tplDfd, vmDfd, styleDfd).then(function(tpl, WidgetViewModel) {
        var $dom = $(tpl)
        var dom = $dom.get(0)
        var vm = new WidgetViewModel(dom, settings)

        ko.applyBindings(vm, dom)

        if(util.type(vm.viewAttached) === 'function') {
          vm.viewAttached(dom)
        }

        widgets[kind] = {
          kind: kind,
          view: dom,
          viewModel: vm
        }
      })
    }
  }
})