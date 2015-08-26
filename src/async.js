function noop() {}

function dequeue(queue) {
  return { current: queue[0], remaining: queue.slice(1) };
}

/**
 * @desc series() applies an iterator to a series of items in an array.
 *
 * @param {Array} [queue=[]] - the array items to process
 * @param {Function} iterator - the iterator to apply to each item
 * @param {Function} done - callback to execute when series complete
 */
export function series(queue = [], iterator = noop, done = noop) {

  function iterate(queue, iterator, done, ...args) {
    const { current, remaining } = dequeue(queue);
    const next = iterate.bind(null, remaining, iterator, done);

    return current ? iterator(current, next, ...args) : done(...args);
  }

  return iterate(queue, iterator, done);
}

/**
 * @desc waterfall() executes a series of functions asychronously.
 *
 * @param {Function[]} [queue=[]] - the array items to process
 */
export function waterfall(queue = []) {

  function iterate(queue, ...args) {
    const { current, remaining } = dequeue(queue);
    const next = iterate.bind(null, remaining);

    return current(...args, next);
  }

  return iterate(queue);
}
