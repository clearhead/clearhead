function sortClassNames(classNames) {
  return classNames.split(' ').sort().join(' ');
}

function hasChanged(oldClassNames, newClassNames) {
  if (oldClassNames !== newClassNames) return true;
  else if (oldClassNames == newClassNames) return false;
}

function findChange(oldClassNames, newClassNames) {
  // Removed a class
  if (oldClassNames.split(' ').length > newClassNames.split(' ').length) {
    return filterClasses(oldClassNames, newClassNames);

  // Added a class
  } else if (oldClassNames.length < newClassNames.length) {
    return filterClasses(newClassNames, oldClassNames);
  }
}

function classNameChange(selector, callback, config={attributes: true}) {
  const target = document.querySelector(selector);

  const oldClassNames = sortClassNames(target.className);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log('mutation: ', mutation);
      const newClassNames = sortClassNames(target.className);

      if (hasChanged(oldClassNames, newClassNames)) {
        observer.disconnect();
        console.log('changed name: ', findChange(oldClassNames, newClassNames));

        callback(findChange(oldClassNames, newClassNames), observer, mutation);
      }
    });
  });

  observer.observe(target, config);
}


// try {
//
// } catch {
//   return window.console.error('CLASS NAME CHANGE ERROR');
// }
