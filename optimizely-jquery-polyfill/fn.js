'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function round(arg) {
  return Math.round(parseFloat(arg));
}

function getDimensions(el) {
  var _window$getComputedStyle = window.getComputedStyle(el);

  var height = _window$getComputedStyle.height;
  var width = _window$getComputedStyle.width;

  return { height: round(height), width: round(width) };
}

var fn = {
  // STYLE/POSITIONS FUNCTIONS
  offset: function offset() {
    return this[0].getBoundingClientRect();
  },

  position: function position() {
    return { left: this[0].offsetLeft, top: this[0].offsetTop };
  },

  height: function height() {
    return getDimensions(this[0]).height;
  },

  width: function width() {
    return getDimensions(this[0]).width;
  },

  // EVENTS
  // .on( events [, selector ] [, data ], handler )
  on: function on(evts) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var handler = args.pop();

    var sel = undefined;
    var data = undefined;

    for (var i = 0; i < args.length; i++) {
      var arg = args[i];

      if (typeof arg === 'string') {
        sel = arg;
      } else if (arg.constructor && arg.constructor === Object) {
        data = arg;
      }
    }

    var method = sel ? 'delegate' : 'bind';
    var params = [sel, evts, data, handler].filter(Boolean);

    return this[method].apply(this, _toConsumableArray(params));
  },

  // .off( [events] [, selector ] [, handler ] )
  off: function off(evts) {

    if (!evts) return this.unbind().undelegate();

    var sel = undefined;
    var handler = undefined;

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    for (var i = 0; i < args.length; i++) {
      var arg = args[i];

      if (typeof arg === 'string') {
        sel = arg;
      } else if (/function|boolean/.test(typeof arg)) {
        handler = arg;
      }
    }

    // .unbind( [events] [, handler ] )
    // .undelegate( [selector] [, eventType] [, handler] )
    var method = sel ? 'undelegate' : 'unbind';
    var params = [sel, evts, handler].filter(Boolean);

    return this[method].apply(this, _toConsumableArray(params));
  },

  hide: function hide() {
    return this.css('display', 'none');
  },

  show: function show() {
    return this.css('display', 'block');
  }
};

exports['default'] = fn;
module.exports = exports['default'];