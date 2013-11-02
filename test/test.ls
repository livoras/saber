can = it

(require) <- define

<-! describe '测试组件开发模板的正确性' 

module1 = require 'module1'
sample-module = require 'sample-module'

can '测试服务器打开', !->
  expect window.location.href .toEqual window.location.href

can '测试jQuery正确加载', !->  
  expect $ .toEqual jQuery

can '测试对DOM的操作', !->
  div = document.createElement 'div'
  div.innerHTML = '<span></span>'
  expect div.childNodes.length .toEqual 1

can '测试AMD模块正确加载', !->  
  expect module1.name .toEqual 'jasmine'
  expect (typeof sample-module) .toEqual 'object'
  expect sample-module.name .toEqual 'sample-module'
  expect sample-module.module1.name .toEqual 'jasmine'
  expect (typeof sample-module.div) .toEqual 'object'