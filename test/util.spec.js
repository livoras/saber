define(function(require) {
  var util = require('src/util')

  describe('Test util functionalities', function() {

    describe("Utilities are works", function() {
      it('Test `extend`', function() {
        var a = {'name': 'Jerry'} 
        var b = {'age': 34}
        util.extend(a, b)
        expect(a.age).toBe(34)
      })
    })

    describe('It ought to load css, html, and js successfully with `promise`', function() {
      var $tpl

      it('load html successfully', function() {
        var flag = false
        var tpl = tpl

        $.when(util.load('test/widgets/fake/fake.html')).then(function(html) {
          tpl = html
          flag = true
        })

        waitsFor(function() {
          return flag
        }, 'wait for loading html asyncnomously', 1000)

        runs(function() {
          $tpl = $(tpl)
          expect($tpl.hasClass('fake')).toBeTruthy()
        })

      })

      it('load css successfully', function() {
        var flag = false

        $.when(util.load('test/widgets/fake/fake.css')).then(function() {
          flag = true
        })

        waitsFor(function() {
          return flag
        }, 'wait for loading css asyncnomously', 1000)

        runs(function() {
          expect($(document.body).css('marginTop')).toBe('10px')
        })
      })

      it('load javascript successfully', function() {
        var flag = false
        var widget 

        $.when(util.load('test/widgets/fake/fake')).then(function(wdg) {
          flag = true
          widget = wdg
        })

        waitsFor(function() {
          return flag
        }, 'wait for loading js asyncnomously', 1000)

        runs(function() {
          expect(util.type(widget)).toBe('function')
        })

      })

    })

  })

})