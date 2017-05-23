import hyperx from 'hyperx'
import {init as snabbdom} from 'snabbdom'
import classModule from 'snabbdom/modules/class'
import styleModule from 'snabbdom/modules/style'
import eventListenersModule from 'snabbdom/modules/eventlisteners'
import attributesModule from 'snabbdom/modules/attributes'
import {parse} from './parse'

/**
 * Create a virtual node.
 * @param {string} template - HTML template.
 * @returns {Object} a virtual node.
 * @example
 * html`
 *   <div>
 *     <p>Hey <span class="span">There</span></p>
 *     <div></div>
 *     dom
 *   <div>
 * `
 */
export const html = hyperx(parse)

/**
 * Make the diff of two virtual node and render them.
 * @param {Object} oldNode - virtual node to be modified.
 * @param {Object} newNode - virtual node to be rendered.
 * @example
 * const oldNode = html`
 *   <div>
 *     <p>Hey <span class="span">There</span></p>
 *     <div></div>
 *     dom
 *   <div>
 * `
 *
 * const newNode = html`
 *   <div>
 *     Hello
 *   <div>
 * `
 *
 * render(oldNode, newNode)
 */
export const render = snabbdom([
  classModule,
  styleModule,
  eventListenersModule,
  attributesModule
])
