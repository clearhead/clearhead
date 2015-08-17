/**
 * @desc timpl() uses double-handlebar syntax to template a string with a data object
 *
 * @param {String} template - the template string
 * @param {Object} [data={}] - the data object
 *
 * @return {String} - the compiled string
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function timpl(template) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var start = '{{';
  var end = '}}';
  var path = '[a-z0-9_$][\\.a-z0-9_]*'; // e.g. config.person.name
  var pattern = new RegExp(start + '\\s*(' + path + ')\\s*' + end, 'gi');

  // Merge data into the template string
  return template.replace(pattern, function (tag, token) {
    var path = token.split('.');
    var len = path.length;

    var lookup = data;

    for (var i = 0; i < len; i++) {
      lookup = lookup[path[i]];

      // Property not found
      if (!lookup) throw 'tim: "' + path[i] + '" not found in ' + tag;

      // Return the required value
      if (i === len - 1) return lookup;
    }
  }).replace(/^\s+|\s+$/g, ''); // trim;
}

exports['default'] = timpl;
module.exports = exports['default'];