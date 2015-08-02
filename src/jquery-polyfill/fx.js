function fade(el, dir, ms = 2000) {
  const fadeIn = dir === 'in';
  const interval = 50;
  const gap = interval / ms;

  let opacity = fadeIn ? 0 : 1;

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

const fx = {
  fadeIn(ms) {
    fade(this[0], 'in', ms);
    return this;
  },

  fadeOut(ms) {
    fade(this[0], 'out', ms);
    return this;
  },
};

export default fx;
