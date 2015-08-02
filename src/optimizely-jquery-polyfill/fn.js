function round(arg) {
  return Math.round(parseFloat(arg));
}

function getDimensions(el) {
  const { height, width } = window.getComputedStyle(el);
  return { height: round(height), width: round(width) };
}

const fn = {
  // STYLE/POSITIONS FUNCTIONS
  offset() {
    return this[0].getBoundingClientRect();
  },

  position() {
    return { left: this[0].offsetLeft, top: this[0].offsetTop };
  },

  height() {
    return getDimensions(this[0]).height;
  },

  width() {
    return getDimensions(this[0]).width;
  },

  // EVENTS
  // .on( events [, selector ] [, data ], handler )
  on(evts, ...args) {
    const handler = args.pop();

    let sel;
    let data;

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (typeof arg === 'string') {
        sel = arg;
      } else if (arg.constructor && arg.constructor === Object) {
        data = arg;
      }
    }

    const method = sel ? 'delegate' : 'bind';
    const params = [sel, evts, data, handler].filter(Boolean);

    return this[method](...params);
  },

  // .off( [events] [, selector ] [, handler ] )
  off(evts, ...args) {

    if (!evts) return this.unbind().undelegate();

    let sel;
    let handler;

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (typeof arg === 'string') {
        sel = arg;
      } else if (/function|boolean/.test(typeof arg)) {
        handler = arg;
      }
    }

    // .unbind( [events] [, handler ] )
    // .undelegate( [selector] [, eventType] [, handler] )
    const method = sel ? 'undelegate' : 'unbind';
    const params = [sel, evts, handler].filter(Boolean);

    return this[method](...params);
  },

  hide() {
    return this.css('display', 'none');
  },

  show() {
    return this.css('display', 'block');
  },
};

export default fn;
