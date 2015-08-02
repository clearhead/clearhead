/**
 * @desc timpl() uses double-handlebar syntax to template a string with a data object
 *
 * @param {String} template - the template string
 * @param {Object} [data={}] - the data object
 *
 * @return {String} - the compiled string
 */
function timpl(template, data = {}) {
  const start = '{{';
  const end = '}}';
  const path = '[a-z0-9_$][\\.a-z0-9_]*'; // e.g. config.person.name
  const pattern = new RegExp(`${start}\\s*(${path})\\s*${end}`, 'gi');

  // Merge data into the template string
  return template.replace(pattern, (tag, token) => {
    const path = token.split('.');
    const len = path.length;

    let lookup = data;

    for (let i = 0; i < len; i++) {
      lookup = lookup[path[i]];

      // Property not found
      if (!lookup) throw `tim: "${path[i]}" not found in ${tag}`;

      // Return the required value
      if (i === len - 1) return lookup;
    }
  }).replace(/^\s+|\s+$/g, ''); // trim;
}

export default timpl;
