import test from 'ava'
import {html} from '../lib'

test('html function', t => {
  const click = () => {}

  const actual = html`
    <a
      class="btn"
      data-type="button"
      href="/"
      style="display: block;"
      onclick=${click}>
      Lorem
    </a>
  `
  const expected = {
    children: undefined,
    data: {
      class: {
        btn: true
      },
      dataset: {
        type: 'button'
      },
      attrs: {
        href: '/'
      },
      style: {
        display: 'block'
      },
      on: {
        click
      }
    },
    sel: 'a',
    text: 'Lorem',
    elm: undefined,
    key: undefined
  }

  t.deepEqual(actual, expected)
})

test('html function with children', t => {
  const actual = html`
    <div>
      <p>Hey <span class="span">There</span></p>
      <div></div>
      dom
    <div>
  `
  const expected = {
    children: [
      {
        children: [
          {
            children: undefined,
            data: undefined,
            sel: undefined,
            text: 'Hey',
            key: undefined,
            elm: undefined
          },
          {
            data: {
              class: {
                span: true
              },
              dataset: undefined,
              attrs: undefined,
              style: undefined,
              on: undefined
            },
            sel: 'span',
            children: undefined,
            text: 'There',
            elm: undefined,
            key: undefined
          }
        ],
        data: undefined,
        sel: 'p',
        text: undefined,
        key: undefined,
        elm: undefined
      },
      {
        children: undefined,
        data: undefined,
        sel: 'div',
        text: undefined,
        elm: undefined,
        key: undefined
      },
      {
        children: undefined,
        data: undefined,
        sel: undefined,
        text: 'dom',
        key: undefined,
        elm: undefined
      }
    ],
    data: undefined,
    sel: 'div',
    text: undefined,
    elm: undefined,
    key: undefined
  }

  t.deepEqual(actual, expected)
})
