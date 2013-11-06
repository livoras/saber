define(function(require) {
  var router = require('src/router')
  var config = require('src/config')
  var widgets = require('src/template-parser').widgets
  var route = router.route
  var _ = require('src/util')

  config.baseWidgetPath = 'test/widgets'

  describe('Test if router works', function() {

    it('Test routiejs library loaded', function() {
      expect(_.type(route)).toBe('function')
    })

    it('router maps works', function() {
      var routerCallback = jasmine.createSpy('router callback')
      var flag = false

      route('mask/:name', routerCallback)
      route('mask/:name', function() {
        flag = true
      })
      route('mask/jerry')

      waitsFor(function() {
        return flag
      })

      runs(function() {
        expect(window.location.href).toEqual('http://127.0.0.1:9001/_SpecRunner.html#mask/jerry')
        expect(routerCallback).toHaveBeenCalledWith('jerry')
      })

    })

    describe('Test hash mapping to cretain widget', function() {
      config.$host = $(document.body)
      var callback = jasmine.createSpy('Mapping Callback')
      var flag = false
      router.map('stupid', 'sample', function() {
        callback('data')
      })

      it('Mapping hash to widget', function() {
        route('stupid')
        waitsFor(function() {
          return widgets['sample']
        }, 'router callback', 1000)
        runs(function() {
          expect(callback).toHaveBeenCalledWith('data')
          expect($('body').find('div.sample:eq(0)').html()).toEqual('Hello Sample')
          expect($(widgets['sample'].view).find('div.sample:eq(0)').html()).toEqual('Hello Sample')
        })
      })

      describe('Test router maps to widget automaticly', function() {
        it('Auto mapping works', function() {
          router.mapAuto('*')
          widgets['fake'] = false
          route('fake')
          waitsFor(function() {
            return widgets['fake']
          }, 'router callback', 1000)
          runs(function() {
            expect(callback).toHaveBeenCalledWith('data')
            expect($('body').find('div.name:eq(0)').html()).toEqual('saber')
            expect($('body').find('div.sample:eq(0)').html()).toBe(void 0)
          })

        })

        it('Mapping will replace widget host container completely', function() {
          widgets['sample'] = false
          route('sample')
          waitsFor(function() {
            return widgets['sample']
          }, 'router callback', 1000)
          runs(function() {
            expect(callback).toHaveBeenCalledWith('data')
            expect($('body').find('div.sample:eq(0)').html()).toEqual('Hello Sample')
            expect($('body').find('div.name:eq(0)').html()).toBe(void 0)
          })
        })

        it('Auto mapping will not affluence custom mapping', function() {
          widgets['stupid'] = false
          route('stupid')
          waitsFor(function() {
            return widgets['sample']
          }, 'router callback', 1000)
          runs(function() {
            expect(callback).toHaveBeenCalledWith('data')
            expect($('body').find('div.sample:eq(0)').html()).toEqual('Hello Sample')
            expect($('body').find('div.name:eq(0)').html()).toBe(void 0)
          })
        })
      })

      it('Unmap a route to widget', function() {
        var flag = false
        widgets['sample'] = false
        router.unmap('stupid')
        setTimeout(function() {
          flag = true
        }, 500)
        route('stupid')
        waitsFor(function() {
          return flag
        })
        runs(function() {
          expect(widgets['sample']).toBeFalsy()
        })
      })

    })

  })
})