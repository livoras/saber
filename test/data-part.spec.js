define(function(require) {
  var containerTpl = require('text!./widgets/container/container.html')
  var config = require('src/config')
  var _ = require('src/util')
  require('src/template-parser')
  config.baseWidgetPath = 'test/widgets'

  describe('Test data-part works like Durandal', function() {
    it('After rendering, container should contain parent\'s view, ' + 
       'the twe `data-part` will be replace with a widget `part` and a normal view', function() {
        $tpl = $(containerTpl)
        tplDom = $tpl.get(0)
        ko.applyBindings({}, tplDom)
        var flag = false
        _.emitter.on('template-parsed:part', function() {
          flag = true
        })
        waitsFor(function() {
          return flag
        })
        runs(function() {
          expect($tpl.find('div.parent-name:eq(0)').text()).toBe('parent')
          expect($tpl.find('div.part-name:eq(0)').text()).toBe('part')
          expect($tpl.find('#nest-view').text()).toBe('Good')
          expect($tpl.html()).toBe('..')
        })
    })
  })
})