import { expect } from 'chai';
import sinon from 'sinon';
import SimpleBarDeclarative from '../src/simplebar';

describe('SimpleBar Declarative Checks', function() {
  it('should be a class', function() {
    expect(SimpleBarDeclarative).to.be.a.function;
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

    expect(SimpleBarDeclarative.defaultOptions).to.be.an.object;
    expect(SimpleBarDeclarative.defaultOptions).to.eql(expected);

  });
});

describe('SimpleBar Declarative HTML API', function () {
  it('should expose a static initHtmlApi method', function () {
    expect(SimpleBarDeclarative.initHtmlApi).to.be.a.function;
  });

  it('should register a mutationObserver when initHtmlApi() is called', function () {
    if (typeof MutationObserver !== 'undefined') {
      var stub = sinon.stub(MutationObserver.prototype, 'observe', function () {
        console.log('stub')
      });
    } else {
      global.window.MutationObserver = function() {};
      var stub = sinon.spy();
      global.window.MutationObserver.prototype.observe = stub;
    }

    SimpleBarDeclarative.initHtmlApi();

    expect(SimpleBarDeclarative.observer).to.be.an.object;

    document.body.appendChild(document.createElement('div'));

    if (stub.restore) stub.restore();

    expect(stub.callCount).to.equal(1); // NOT WORKING; todo: fix me
  });

  it('should disconnect the observer when removeObserver() is called', function () {
    SimpleBarDeclarative.initHtmlApi();
    SimpleBarDeclarative.removeObserver();
    expect(SimpleBarDeclarative.observer).to.equal(undefined);
  });
});