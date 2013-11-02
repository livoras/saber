module.exports = (grunt)->
  process.env.DEBUG = 'saber'

  grunt.initConfig
    clean: 
      bin: ['bin']
      build: ['dist']

    connect: 
      server: 
        options: 
          port: 9001,

    watch:
      compile:
        files: ["src/**/*.js", "test/**/*.js", "lib/**/*.js"]
        tasks: ["jasmine"]

    jasmine:       
      test:
        src: ['src/**/*.js', 'lib/knockout-3.0.0.js']
        options:
          host: 'http://127.0.0.1:9001/'
          vendor: 'lib/**/jquery-*.js'
          specs: 'test/**/*.spec.js'
          helpers: 'test/helper.js',
          template: require 'grunt-template-jasmine-requirejs'
          templateOptions: 
            requireConfig:
              baseUrl: '.'
              paths:
                'knockout': './lib/knockout-3.0.0'
              deps: ['knockout']


  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.loadNpmTasks "grunt-contrib-connect"

  grunt.registerTask "default", ["connect", "jasmine", "watch"]