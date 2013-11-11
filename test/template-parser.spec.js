define(function(require) {
  var entryTpl = require('text!./widgets/fake-entry.html')
  var config = require('src/config')
  var _ = require('src/util')
  var widgets = {}

  // require('src/template-parser')

  config.baseWidgetPath = 'test/widgets'

  describe('ko.widget binding handler successfully parsed template and load widget', function() {
    _.emitter.on('template-parsed', function(data) {
      widgets[data.kind] = data
    })

    it('can load entry template', function() {
      expect(_.type(entryTpl)).toBe('string')
    })

    it('ko.widget works' ,function() {
      var $entry = $(entryTpl)
      var entryDom = $entry.get(0)

      widgets['fake'] = false
      ko.applyBindings({name: 'parent'}, entryDom)

      waitsFor(function() {
        return widgets['fake']
      }, 'when a widget loaded', 2000)

      runs(function() {
        var widgetInfo = widgets['fake']
        var $fake = $(widgetInfo.view)
        var kind = widgetInfo.kind
        expect($fake.find('div.name').text()).toBe('saber')
        expect(kind).toBe('fake')
      })
    })

    it('can parse ko.widget binding inside widget', function() {
      widgets['inner'] = false

      waitsFor(function() {
        return widgets['inner']
      }, 'when a widget loaded', 2000)

      runs(function() {
        var widgetInfo = widgets['inner']
        var $fake = $(widgetInfo.view)
        var kind = widgetInfo.kind
        expect($fake.find('h1.gender').text()).toBe('female')
        expect($fake.find('h2.name').text()).toBe('saber inner')
        expect(kind).toBe('inner')
      })
    })

    it('After rendering the widget, `viewAttached` in every viewModel should be called', function() {
      expect(widgets['fake'].viewModel.attached).toBeTruthy() 
      expect($(widgets['fake'].viewModel.view).find('div.name').text()).toBe('saber') 
    })
  })
})