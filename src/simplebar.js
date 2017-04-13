/**
 * HTML API
 */

import SimpleBar from './simplebar-imperative';

export default class SimpleBarDeclarative extends SimpleBar {

  static get htmlAttributes() {
    return {
      autoHide: 'data-simplebar-autohide',
      forceEnabled: 'data-simplebar-force-enabled',
      scrollbarMinSize: 'data-simplebar-scrollbar-min-size'
    }
  }

  static initHtmlApi() {
    // MutationObserver is IE11+
    if (typeof MutationObserver !== 'undefined') {
      // Mutation observer to observe dynamically added elements
      const globalObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          Array.from(mutation.addedNodes).forEach(addedNode => {
            if (addedNode.nodeType === 1) {
              if (addedNode.SimpleBar) return;

              if (addedNode.hasAttribute('data-simplebar')) {
                new SimpleBar(addedNode, SimpleBarDeclarative.getElOptions(addedNode));
              } else {
                Array.from(addedNode.querySelectorAll('[data-simplebar]')).forEach(el => {
                  new SimpleBar(el, SimpleBarDeclarative.getElOptions(el));
                });
              }
            }
          });

          Array.from(mutation.removedNodes).forEach(removedNode => {
            if (removedNode.nodeType === 1) {
              if (removedNode.hasAttribute('data-simplebar')) {
                removedNode.SimpleBar && removedNode.SimpleBar.unMount();
              } else {
                Array.from(removedNode.querySelectorAll('[data-simplebar]')).forEach(el => {
                  el.SimpleBar && el.SimpleBar.unMount();
                });
              }
            }
          });
        });
      });

      globalObserver.observe(document, {childList: true, subtree: true});
      this.observer = globalObserver;
    }

    // Taken from jQuery `ready` function
    // Instantiate elements already present on the page
    if (document.readyState === 'complete' ||
      (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
      // Handle it asynchronously to allow scripts the opportunity to delay init
      window.setTimeout(this.initDOMLoadedElements.bind(this));
    } else {
      document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements.call(this));
      window.addEventListener('load', this.initDOMLoadedElements.call(this));
    }
  }

  // Helper function to retrieve options from element attributes
  static getElOptions(el) {
    const options = Object.keys(SimpleBarDeclarative.htmlAttributes).reduce((acc, obj) => {
      const attribute = SimpleBarDeclarative.htmlAttributes[obj];
      if (el.hasAttribute(attribute)) {
        acc[obj] = JSON.parse(el.getAttribute(attribute) || true);
      }
      return acc;
    }, {});

    return options;
  }

  static removeObserver() {
    this.observer && this.observer.disconnect();
  }

  static initDOMLoadedElements() {
    document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
    window.removeEventListener('load', this.initDOMLoadedElements);

    Array.from(document.querySelectorAll('[data-simplebar]')).forEach(el => {
      if (!el.SimpleBar)
        new SimpleBar(el, SimpleBarDeclarative.getElOptions(el));
    });
  }
}

SimpleBarDeclarative.initHtmlApi();