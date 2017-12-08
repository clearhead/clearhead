/**
 * sortClassNames - Default-sorts through the an element's class list to more easily compare against other class name lists.
 *
 * @param  {string} classNames - The element's string of class names.
 * @return {array}             - A sorted list the class names.
 */
function sortClassNames(classNames) {
  return classNames.split(' ').sort();
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
 * determineHowToCompareClassLists - Determines which list to use to compare against the other.
 *
 * @param  {array} oldClassNames - The target element's previous class names.
 * @param  {array} newClassNames - The target element's new list of class names.
 * @return {array}               - The correctly ordered list of class lists.
 */
function determineHowToCompareClassLists(oldClassNames, newClassNames) {

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
  const comparableClassLists = determineHowToCompareClassLists(oldClassNames, newClassNames);

  return findClassNameDifference(comparableClassLists[0], comparableClassLists[1]);
}

/**
 * classNameChange - Uses a mutation observer to watch for when an element's class
 * names has been added to/removed from.
 *
 * @param  {string} selector  - The css selector to query the DOM for the element.
 * @param  {object} config={attributes: true} - Target node's default configuration is set to be for target element but could be adjusted to watch on a parent element and listen to changes in children elements.
 * @param  {function} callback - The function to run once/if target element's name has changed.
 *
 * @return {undefined}
 */
function classNameChange(selector, config={attributes: true}, callback) {
  const target = document.querySelector(selector);

  const oldClassNames = sortClassNames(target.className);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const newClassNames = sortClassNames(target.className);

      if (hasChanged(oldClassNames, newClassNames)) {
        observer.disconnect();
        console.log('getClassChange: ', getClassChange(oldClassNames, newClassNames));
        callback(getClassChange(oldClassNames, newClassNames), target, observer);
      }
    });
  });

  observer.observe(target, config);
}
