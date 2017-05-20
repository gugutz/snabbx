import test from 'ava'
import {parseCssRule} from '../lib/utils'

test('parseCssRule function', t => {
  const actual = parseCssRule('display: block; color: red;')
  const expected = {
    display: 'block',
    color: 'red'
  }

  t.deepEqual(actual, expected)
})
