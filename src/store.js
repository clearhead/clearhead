/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc #store exposes a simple pattern to get / set from localStorage
 *
 * @return {store} - store.get, store.set, store.del
 */

const noop = (...args) => console.error.call(console, 'window.localStorage undefined', ...args);
const store = typeof window !== 'undefined' ? window.localStorage : {
  getItem: noop,
  setItem: noop,
  removeItem: noop,
};

export default {
  get: store.getItem.bind(store),
  set: store.setItem.bind(store),
  del: store.removeItem.bind(store),
};
