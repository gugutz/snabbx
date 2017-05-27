import {isArray, cleanUpStrings, parseCssRule} from './utils'

export const getChildren = children => {
  if (!children) {
    return undefined
  }
  if (isArray(children) && children.length > 1) {
    return children
      .filter(child => {
        if (typeof child === 'string') {
          return cleanUpStrings(child).trim() !== ''
        }

        if (isArray(child[2])) {
          return cleanUpStrings(child[2][0]).trim() !== ''
        }

        return true
      })
      .map(child => {
        if (typeof child === 'string') {
          return parse(undefined, {}, [child])
        }

        if (typeof child === 'number') {
          return parse(undefined, {}, [child.toString()])
        }

        return child
      })
  }
  return undefined
}

export const getText = children => {
  if (children && children.length === 1) {
    return cleanUpStrings(children[0])
  }

  return undefined
}

export const getClasses = ({className}) => {
  if (!className) {
    return undefined
  }

  return className.split(' ').reduce((previous, current) => {
    previous[current] = true
    return previous
  }, {})
}

export const getDataAttributes = attrs => {
  const dataAttrs = Object.keys(attrs).filter(
    attr => attr.indexOf('data-') === 0
  )

  if (dataAttrs.length === 0) {
    return undefined
  }

  return dataAttrs.reduce((previous, current) => {
    previous[current.substring(5)] = attrs[current]
    return previous
  }, {})
}

export const getEventsListeners = attrs => {
  const eventListeners = Object.keys(attrs).filter(
    attr => attr.indexOf('on') === 0
  )

  if (eventListeners.length === 0) {
    return undefined
  }

  return eventListeners.reduce((previous, current) => {
    previous[current.substring(2)] = attrs[current]
    return previous
  }, {})
}

export const getStyles = ({style}) => {
  if (!style) {
    return undefined
  }

  return parseCssRule(style)
}

export const getAttributes = attrs => {
  const attributes = Object.keys(attrs)
    .filter(attr => attr !== 'style')
    .filter(attr => attr !== 'className')
    .filter(attr => attr.indexOf('on') !== 0)
    .filter(attr => attr.indexOf('data-') !== 0)

  if (attributes.length === 0) {
    return undefined
  }

  return attributes.reduce((previous, current) => {
    previous[current] = attrs[current]
    return previous
  }, {})
}

export const getData = attrs => {
  const data = {
    class: getClasses(attrs),
    dataset: getDataAttributes(attrs),
    on: getEventsListeners(attrs),
    style: getStyles(attrs),
    attrs: getAttributes(attrs)
  }

  if (Object.keys(data).every(key => data[key] === undefined)) {
    return {}
  }

  return data
}

export const parse = (sel, attrs, children) => ({
  sel,
  data: getData(attrs),
  children: getChildren(children),
  text: getText(children),
  elm: undefined,
  key: undefined
})
