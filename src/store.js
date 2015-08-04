/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc #store exposes a simple pattern to get / set from localStorage
 *
 * @return {store} - store.get, store.set, store.del
 */
var store = window.localStorage;

export default {
  get: store.getItem.bind(store),
  set: store.setItem.bind(store),
  del: store.removeItem.bind(store),
};
