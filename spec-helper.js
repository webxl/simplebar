var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!DOCTYPE html><head></head><html><body></body></html>');
global.window = document.defaultView;
global.window.document = global.document;