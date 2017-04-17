var expect = require('chai').expect;
var SimpleBar = require('../src/simplebar-imperative');

describe('SimpleBar Base Class (imperative) Checks', function() {
  it('should be a class', function() {
    expect(SimpleBar).to.be.a.function;
  });
  
  it('should define some default options and expose a static method to retrieve them', function() {
    var expected = {
      wrapContent: true,
      autoHide: true,
      forceEnabled: false,
      classNames: {
        content: 'simplebar-content',
        scrollContent: 'simplebar-scroll-content',
        scrollbar: 'simplebar-scrollbar',
        track: 'simplebar-track'
      },
      scrollbarMinSize: 10
    };

    expect(SimpleBar.defaultOptions).to.be.an.object;
    expect(SimpleBar.defaultOptions).to.eql(expected);

  });
});
describe('SimpleBar Constructor', function() {
  it('should take a DOM element and an options object', function() {
    let el = document.createElement('div');
    document.body.appendChild(el);
    let sb = new SimpleBar(el, {autoHide: false});
    expect(sb.el === el).to.be.true;
    expect(sb.options.autoHide).to.be.false;
  });
});
