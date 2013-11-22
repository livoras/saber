define(function(require) {
  var _ = require('src/util')
  var route = require('src/router').route

  describe("Widget should be cached for second loading time", function() {
    it("widge should fetch from server for the first time", function() {
      route('#widget-cache')
      flag = false
      parseData = null
      _.emitter.on('template-parsed:widget-cache', function(data) {
        parseData = data
      })
      waitsFor(function() {
        return parseData
      })
      runs(function() {
        expect($('#widget-cache').text()).toBe('widget-cache')
        expect(parseData.fromCache).not.toBeTruthy()
      })
    });
    it('widget should be loaded from cache for the second time', function() {
      route('#widget-holder')
      route('#widget-cache')
      parseData = null
      _.emitter.on('template-parsed:widget-cache', function(data) {
        parseData = data
      })
      waitsFor(function(){
        return parseData
      })
      runs(function(){
        expect(parseData.fromCache).toBeTruthy()
      })
    })
  });
})