/**
 * @desc wrap() - helper pattern for try / catch / report
 */
import report from './report';

function wrap(str, fn, ...args) {
  try {
    fn.apply(this, args);
  } catch (e) {
    report(e, str);
  }
}

export default wrap;
