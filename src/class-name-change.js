/**
 * sortClassNames - Default-sorts through the an element's class list to more easily compare against other class name strings.
 *
 * @param  {type} classNames description
 * @return {string}
 */
function sortClassNames(classNames) {
  return classNames.split(' ').sort().join(' ');
}

/**
 * hasChanged - description
 *
 * @param  {string} oldClassNames - The target element's previous class names.
 * @param  {string} newClassNames - The target element's changed class names
 * @return {boolean}              - Evaluator for whether or not the comparable class names are different from eachother.
 */
function hasChanged(oldClassNames, newClassNames) {
  if (oldClassNames !== newClassNames) return true;

  return false;
}

/**
 * findClassNameDifference - description
 *
 * @param  {string} firstClassList  - The (longer?) class list to compare against the second class list.
 * @param  {string} secondClassList - The (shorter?) class list to compare with the first class list.
 * @return {string=}                - The different class between the two class lists.
 */
function findClassNameDifference(firstClassList, secondClassList) {
  const whichOneIsDifferent = firstClassList.split(' ').filter((className, i) => {
    if (secondClassList.indexOf(className) === -1) return className;
  });

  if (!!whichOneIsDifferent && whichOneIsDifferent.length <= 1) return whichOneIsDifferent[0];
  else whichOneIsDifferent;
}

/**
 * getClassNameChange - Determines how to filter through each class list to find the difference between the two.
 *
 * @param  {string} oldClassNames - The target element's previous class names.
 * @param  {string} newClassNames - The target element's changed class names.
 * @return {@findClassNameDifference}
 */
function getClassNameChange(oldClassNames, newClassNames) {
  // Removed a class
  if (oldClassNames.length > newClassNames.length) {
    return findClassNameDifference(oldClassNames, newClassNames);
  }
  // Added or changed a class
  return findClassNameDifference(newClassNames, oldClassNames);
}

/**
 * classNameChange - Uses a mutation observer to watch for when an element's class
 * names has been added to/removed from.
 *
 * @param  {string} selector  - The css selector to query the DOM for the element. *
 * @param  {function} callback - The function to run once/if target element's name has changed.
 * @param  {object} config={attributes: true} - Target node's default configuration is set to be for target element but could be adjusted to watch on a parent element and listen to changes in children elements.
 *
 * @return {undefined}
 */
function classNameChange(selector, callback, config={attributes: true}) {
  const target = document.querySelector(selector);

  const oldClassNames = sortClassNames(target.className);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const newClassNames = sortClassNames(target.className);

      if (hasChanged(oldClassNames, newClassNames)) {
        observer.disconnect();

        callback(getClassNameChange(oldClassNames, newClassNames), observer, mutation);
      }
    });
  });

  observer.observe(target, config);
}
