/**
 * Promise implementation
 * @exports Deferred
 */

/**
 * @mixin _Promise
 * @desc Provides methods for registering success and failure handlers
 */
const _Promise = {
  /**
   * Register a chainable success handler
   *
   * @param {Function} [handler = () => {}] - The success handler
   */
  success(handler = () => {}) {
    if (this.isResolved) handler(this.data);
    else {
      this.successHandler = handler;
    }

    return this;
  },

  /**
   * Register a chainable failure handler
   *
   * @param {Function} [handler = () => {}] - The failure handler
   */
  fail(handler = () => {}) {
    if (this.isRejected) handler(this.error);
    else {
      this.failureHandler = handler;
    }

    return this;
  },
};

/**
 * @function Promise()
 * @desc Returns a new promise object that delegates to the _Promise object
 */
function Promise() {
  return Object.create(_Promise);
}

/**
 * @mixin _Deferred
 * @desc Provides methods for creating a promise and resolving or rejecting it
 */
const _Deferred = {
  /**
   * Create a promise
   */
  promise() {
    if (this._promise) return this._promise;

    this._promise = Promise();
    return this._promise;
  },

  /**
   * Resolve the promise (can be done asynchronously or synchronously)
   *
   * @param {*} [data] - Any type of data to be passed to the success handler (optional)
   */
  resolve(data) {
    if (!this._promise) this.promise();

    this._promise.data = data;
    this._promise.isResolved = true;

    const handler = this._promise.successHandler;

    if (handler) return handler(data);
  },

  /**
   * Reject the promise (can be done asynchronously or synchronously)
   *
   * @param {*} [error] - Any type of data to be passed to the failure handler (optional)
   */
  reject(error) {
    if (!this._promise) this.promise();

    this._promise.error = error;
    this._promise.isRejected = true;

    const handler = this._promise.failureHandler;

    if (handler) return handler(error);
  },
};

/**
 * @function Deferred()
 * @desc Returns a new deferred object that delegates to the Deferred object
 */
export default function Deferred() {
  return Object.create(_Deferred);
}
