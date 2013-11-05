define(function(require) {
  var Widget = require('src/widget')
  var _ = require('src/util')

  describe('Testing Widget', function() {
    var widget, widget2

    beforeEach(function() {
      widget = new Widget
      widget2 = new Widget
    })

    it('Loaded Abstract Widget class', function() {
      expect(_.type(Widget)).toBe('function')
      expect(_.type(widget)).toBe('object')
    })

    it('A widget should has evenemitter interfaces, and works', function() {
      expect(_.type(widget.on)).toBe('function')
      expect(_.type(widget.off)).toBe('function')
      expect(_.type(widget.emit)).toBe('function')
      expect(_.type(widget.trigger)).toBe('function')
      var callback = jasmine.createSpy('callback')
      widget.on('widget:callback', callback)
      widget.trigger('widget:callback', 'hello')
      expect(callback).toHaveBeenCalledWith('hello')

      widget.off('widget:callback', callback)
      widget.trigger('widget:callback', 'hello')
      expect(callback.calls.length).toBe(1)
    })

    it('Different widget should not affluence each other\' events', function() {
      var callback = jasmine.createSpy()
      widget.on('some event', callback)
      widget2.on('some event', callback)
      widget.trigger('some event', 'data')
      expect(callback).toHaveBeenCalledWith('data')
      expect(callback.calls.length).toBe(1)
      expect(widget.emitter).not.toBe(widget2.emitter)
    })

  })
})