define(function(require) {

  var text = require('text!./load-test/text.html')
  var EventEmitter = require('eventemitter')

  require('css!./load-test/style.css')

  describe('requirejs loading test', function() {
    var $text = $(text)

    it('should load text file', function() {
      expect($text.size()).toEqual(1)
    })

    it('should load style file', function() {
      var $body = $(document.body)
      expect($body.css('height')).toEqual('10px')
      expect($body.css('width')).toEqual('130px')
    })
  })

  describe('eventemitter test', function() {
    it('eventemitter should be load and works the way we expect it to', function(done) {
      var emitter = new EventEmitter
      var callback = jasmine.createSpy('callback')
      expect(typeof emitter).toBe('object')
      emitter.on('test:event', callback)
      emitter.emit('test:event', 'data')
      expect(callback).toHaveBeenCalledWith('data')
    })
  })

})