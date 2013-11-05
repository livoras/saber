define(function(require) {
  
  describe('Check all libraries are working', function() {
    it('jQuery is working', function() {
      expect(jQuery).toBe($)
    })

    it('KnockoutJS is working', function() {
      expect(typeof ko).toBe('object')
      expect(typeof window.ko).toBe('object')
    })

  })

})