/**
 * @desc slugify() Returns the 'slug' of a string (replaces non-word characters with hyphens)
 *
 * @param {string} [text] - The string you'd like to slugify
 *
 * @return {string} - A slugified version of the string
 */

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export default slugify;
