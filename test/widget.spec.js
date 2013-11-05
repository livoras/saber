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

    describe('Sub Widget extends from the Super Widget', function() {
      it('Different sub widgets will extends independently', function() {

        var callback1 = jasmine.createSpy('sub class 1')
        var callback2 = jasmine.createSpy('sub class 2')

        var Sub1 = Widget.extend(function() {
          this.on('sub1:event', callback1)
          this.on('sub2:event', callback2)
        })

        var Sub2 = Widget.extend(function() {
          this.on('sub1:event', callback1)
          this.on('sub2:event', callback2)
        })

        var sub1 = new Sub1
        var sub2 = new Sub2
        sub1.trigger('sub1:event', 'sub1-data')
        sub2.trigger('sub2:event', 'sub2-data')

        expect(callback1).toHaveBeenCalledWith('sub1-data')
        expect(callback2).toHaveBeenCalledWith('sub2-data')

        expect(callback1.calls.length).toBe(1)
        expect(callback2.calls.length).toBe(1)
      })

      it('Extend sub sidget from sub widget', function() {
        var callback3 = jasmine.createSpy('Super callback')
        var callback4 = jasmine.createSpy('Sub callback')

        var Sub3 = Widget.extend(function() {
          this.on('sub3:event', callback3)
        })

        var Sub4 = Sub3.extend(function() {
          this.on('sub3:event', callback4)
        })

        sub4 = new Sub4
        sub4.trigger('sub3:event', 'sub4-data')
        expect(callback3).toHaveBeenCalledWith('sub4-data')
        expect(callback4).toHaveBeenCalledWith('sub4-data')
      })
    })


  })
})