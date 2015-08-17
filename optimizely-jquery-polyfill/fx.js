'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function fade(el, dir) {
  var ms = arguments.length <= 2 || arguments[2] === undefined ? 2000 : arguments[2];

  var fadeIn = dir === 'in';
  var interval = 50;
  var gap = interval / ms;

  var opacity = fadeIn ? 0 : 1;

  if (fadeIn) {
    el.style.opacity = opacity;
    el.style.display = 'inline';
  }

  function tick() {
    opacity = fadeIn ? opacity + gap : opacity - gap;
    el.style.opacity = opacity;

    if (opacity <= 0) el.style.display = 'none';
    if (opacity > 0 && opacity < 1) return setTimeout(tick, interval);
  }

  tick();
}

var fx = {
  fadeIn: function fadeIn(ms) {
    fade(this[0], 'in', ms);
    return this;
  },

  fadeOut: function fadeOut(ms) {
    fade(this[0], 'out', ms);
    return this;
  }
};

exports['default'] = fx;
module.exports = exports['default'];