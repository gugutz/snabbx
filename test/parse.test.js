import test from 'ava'
import {
  getText,
  getClasses,
  getDataAttributes,
  getEventsListeners,
  getStyles,
  getAttributes
} from '../lib/parse'

test('getText function with one item', t => {
  const actual = getText(['\n Hey man  '])
  const expected = 'Hey man'

  t.is(
    actual,
    expected,
    'it should return a plain string if the array has only one item'
  )
})

test('getText function with more than one item', t => {
  const actual = getText(['\n Hey man  ', {}])
  const expected = undefined

  t.is(
    actual,
    expected,
    'it should undefined if the array has more than one item'
  )
})

test('getClasses function with a single class', t => {
  const actual = getClasses({
    className: 'btn'
  })

  const expected = {
    btn: true
  }

  t.deepEqual(actual, expected, 'it should return an object')
})

test('getClasses function with more than one class', t => {
  const actual = getClasses({
    className: ['btn', 'btn-default']
  })

  const expected = {
    btn: true,
    'btn-default': true
  }

  t.deepEqual(actual, expected, 'it should return an object')
})

test('getClasses function with no classes', t => {
  const actual = getClasses({})
  const expected = undefined

  t.is(
    actual,
    expected,
    'it should return undefined if no classNames are defined'
  )
})

test('getDataAttributes function', t => {
  const actual = getDataAttributes({
    href: '/',
    'data-type': 'hey',
    'data-load': true
  })

  const expected = {
    type: 'hey',
    load: true
  }

  t.deepEqual(actual, expected, 'it should return an object')
})

test('getDataAttributes function with no data-attributes', t => {
  const actual = getDataAttributes({})
  const expected = undefined

  t.is(actual, expected, 'it should return undefined')
})

test('getEventsListeners function with no events', t => {
  const actual = getEventsListeners({})
  const expected = undefined

  t.is(actual, expected, 'it should return undefined')
})

test('getEventsListeners function', t => {
  const handleClick = () => {}
  const handleInput = () => {}

  const actual = getEventsListeners({
    onclick: handleClick,
    href: '/',
    oninput: handleInput
  })

  const expected = {
    click: handleClick,
    input: handleInput
  }

  t.deepEqual(actual, expected, 'it should return an object')
})

test('getStyles function with style defined', t => {
  const actual = getStyles({style: 'display: block; color: red;'})
  const expected = {
    display: 'block',
    color: 'red'
  }

  t.deepEqual(actual, expected)
})

test('getStyles function with no style', t => {
  const actual = getStyles({})
  const expected = undefined

  t.is(actual, expected, 'it should return undefined if no style is defined')
})

test('getAttributes function', t => {
  const actual = getAttributes({'data-type': 'hey', onclick() {}, href: '/'})
  const expected = {
    href: '/'
  }

  t.deepEqual(
    actual,
    expected,
    'it should the attributes ignoring events listeneres, styles, class names and data-attributes'
  )
})
