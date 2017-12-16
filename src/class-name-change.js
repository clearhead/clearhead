/**
 * sortClassNames - Default-sorts through the an element's class list to more easily compare against other class name lists.
 *
 * @param  {array} classList - The element's list of classes.
 * @return {array}             - A sorted list the class names.
 */
function sortClassNames(classList) {
  return classList.split(' ').sort();
}

/**
 * allClassesChanged - Checks if the old/new class names were either completely
 * removed or all new ones had been added.
 *
 * @param  {array} oldClassNames - The target element's previous class names.
 * @param  {array} newClassNames - The target element's new list of class names.
 * @return {array}               - The list of all class names added/removed.
 */
function allClassesChanged(oldClassNames, newClassNames) {
  const classLists = orderClassLists(oldClassNames, newClassNames);

  if (!classLists[0].length) {
    return classLists[1];
  } else if (!classLists[1].length) {
    return classLists[0];
  }
}

/**
 * hasChanged - description
 *
 * @param  {array} oldClassNames - The target element's previous class names.
 * @param  {array} newClassNames - The target element's new list of class names.
 * @return {boolean}             - Evaluator for whether or not the comparable class names are different from eachother.
 */
function hasChanged(oldClassNames, newClassNames) {
  if (oldClassNames !== newClassNames) return true;

  return false;
}

/**
 * findClassNameDifference - Compares two lists of class names, returning all differences.
 *
 * @param  {array} firstClassList   - The (longer=) class list to compare against the second class list.
 * @param  {string} secondClassList - The (shorter=) class list to compare with the first class list.
 * @return {array}                  - The different class between the two class lists.
 */
function findClassNameDifference(firstClassList, secondClassList) {
 return firstClassList.filter((className) => secondClassList.indexOf(className) === -1);
}

/**
 * orderClassLists - Determines which list to use to compare against the other.
 *
 * @param  {array} oldClassNames - The target element's previous class names.
 * @param  {array} newClassNames - The target element's new list of class names.
 * @return {array}               - The correctly ordered list of class lists.
 */
function orderClassLists(oldClassNames, newClassNames) {

  // Removed a class.
  if (oldClassNames.length > newClassNames.length) {
    return [oldClassNames, newClassNames];
  }

  // Added or changed a class.
  return [newClassNames, oldClassNames];
}
/**
 * getClassChange - Determines how to filter through each class list to find the difference between the two.
 *
 * @param  {array} oldClassNames - The target element's previous class names.
 * @param  {array} newClassNames - The target element's new list of class names.
 * @return {@findClassNameDifference}
 */
function getClassChange(oldClassNames, newClassNames) {
  const comparableClassLists = orderClassLists(oldClassNames, newClassNames);

  return findClassNameDifference(comparableClassLists[0], comparableClassLists[1]);
}

/**
 * classNameChange - Uses a mutation observer to watch for when an element's class
 * names has been added to/removed from.
 *
 * @param  {string} selector  - The css selector to query the DOM for the element.
 * @param  {object} config={attributes: true} - Target node's default configuration is set to be for target element but could be adjusted to watch on a parent element and listen to changes in children elements.
 * @param  {function} callback - The function to run once target element's name has changed.
 *
 * @return {undefined}
 */
export default function classNameChange(selector, callback, config={attributes: true}) {
  var target = document.querySelector(selector);

  var oldClassNames = sortClassNames(target.className);

  var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      var newClassNames = sortClassNames(target.className);

      // If all classes were removed, just send back the original class list
      if (!!allClassesChanged(oldClassNames, newClassNames)) {
        observer.disconnect();

        callback(allClassesChanged(oldClassNames, newClassNames), target);
      }

      if (hasChanged(oldClassNames, newClassNames)) {
        observer.disconnect();
        // send back all class name differences w/ original element & observer (if user wants to make change and keep observing).

        if (getClassChange(oldClassNames, newClassNames).length > 0) {
          callback(getClassChange(oldClassNames, newClassNames), target);
        }
      }
    });
  });

  observer.observe(target, config);
}
