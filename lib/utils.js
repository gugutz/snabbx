export const cleanUpStrings = str => str.replace(/(\r\n|\n|\r)/gm, '')

export const parseCssRule = str =>
  str
    .split(';')
    .filter(i => i !== '')
    .reduce((previous, current) => {
      const declaration = current.split(':').map(str => str.trim())
      previous[declaration[0]] = declaration[1]
      return previous
    }, {})

export const isArray = arg =>
  Object.prototype.toString.call(arg) === '[object Array]'

export const flatten = arr =>
  arr.reduce((flat, toFlatten) => {
    return flat.concat(isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  }, [])
