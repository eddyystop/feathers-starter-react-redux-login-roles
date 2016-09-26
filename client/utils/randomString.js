
/* eslint prefer-spread: 0 */

// See http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript/8084248#8084248
// answers by amichair, amichair and Martijn de Milliano

// Background:
// http://stackoverflow.com/questions/3751520/how-to-generate-sequence-of-numbers-chars-in-javascript
// http://www.2ality.com/2012/06/dense-arrays.html
// Array.apply(0, Array(8)).map(function() { return 1; })
// Array(8) produces a sparse array with 8 elements, all undefined.
// The apply trick will turn it into a dense array.
// Finally, with map, we replace that undefined the (same) value of 1.

const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const slen = s.length;

/**
 * Generate a random string of lower/upper case letters and numbers.
 *
 * @param {number} len - Length if string to generate
 * @returns {string} Random string, length len.
 */
module.exports = (len) =>
  Array.apply(null, Array(len)).map(() => s.charAt(Math.floor(Math.random() * slen))).join('');
