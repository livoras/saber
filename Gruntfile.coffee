module.exports = (grunt)->
  process.env.DEBUG = 'facility'

  grunt.initConfig
    clean: 
      bin: ['bin']
      build: ['dist']

    connect: 
      server: 
        options: 
          port: 9001,

    release:       
      options: 
        npm: false
        github:
          repo: 'Thucydide/grunt-boilerplate'
          usernameVar: 'GITHUB_USERNAME'
          passwordVar: 'GITHUB_PASSWORD'


    coffee:
      src: 
        expand: true
        flatten: true
        cwd: 'src'
        src: ['**/*.coffee']
        dest: 'bin/'
        ext: '.js'
      test:  
        expand: true 
        flatten: true
        cwd: 'test'
        src: ['**/*.coffee']
        dest: 'bin/'
        ext: '.spec.js'
      build:
        files: [
          expand: true 
          flatten: true
          cwd: 'src'
          src: ['**/*.coffee']
          dest: 'dist/'
          ext: '.js'
        ]

    livescript:
      src:
        expand: true
        flatten: true
        cwd: 'src'
        src: ['**/*.ls']
        dest: 'bin/'
        ext: '.js'
      test:
        expand: true 
        flatten: true
        cwd: 'test'
        src: ['**/*.ls']
        dest: 'bin/'
        ext: '.spec.js'
      build:
        files: [
          expand: true 
          flatten: true
          cwd: 'src'
          src: ['**/*.ls']
          dest: 'dist/'
          ext: '.js'
        ]

    watch:
      compile:
        files: ["src/**/*.ls", "test/**/*.ls", "src/**/*.coffee", "test/**/*.coffee"]
        tasks: ["livescript:src", "livescript:test", "coffee:src", "coffee:test", "jasmine"]

    jasmine:       
      test:
        src: 'bin/**/*.js'
        options:
          host: 'http://127.0.0.1:9001/'
          vendor: 'lib/**/*.js'
          specs: 'test/**/*.spec.js'
          template: require 'grunt-template-jasmine-requirejs'
          templateOptions: 
            requireConfig:
              baseUrl: 'bin/'

  grunt.loadNpmTasks "grunt-livescript"
  grunt.loadNpmTasks "grunt-release"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.loadNpmTasks "grunt-contrib-connect"

  grunt.registerTask "default", ["clean:bin", "connect", "livescript:src", "livescript:test", "coffee:src", "coffee:test", "jasmine", "watch"]
  grunt.registerTask "build", ["clean:build", "livescript:build", "coffee:build"]