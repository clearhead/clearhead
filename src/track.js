/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc track() send prop to sitecat
 */
import log from './log';

function track(prop, goalName) {
  log('goal:', prop, goalName);
  if (!window.s) return log('goal error: window.s undefined');
  if (!s.tl) return log('goal error: s.tl undefined');
  s.linkTrackVars = prop;
  s.linkTrackEvents = 'None';
  s[prop] = goalName; // unique
  s.tl(true, 'o', 'Clearhead Goal'); // static params / do not update
}

export default track;
