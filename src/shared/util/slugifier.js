import slugify from 'slugify'

/**
 * This little method assumes that the incoming value is a string, so please send a string to it.
 *
 * Receives and string, and return an string modified by the options selected.
 *
 * E.g use case
 * slug('some string', {
 *   replacement: '-',  // replace spaces with replacement character, defaults to `-`
 *   remove: undefined, // remove characters that match regex, defaults to `undefined`
 *   lower: false,      // convert to lower case, defaults to `false`
 *   strict: false,     // strip special characters except replacement, defaults to `false`
 *   locale: 'vi'       // language code of the locale to use
 * })
 *
 * @param {string} text
 * @param {boolean} [options={ replacement: '-', lower: true }] {default options}
 * @return {*}  {string}
 */
export const slug = (text = '', options = { replacement: '-', lower: true }) =>
  slugify(text, options)
