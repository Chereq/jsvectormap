import {
  createElement,
  findElement
} from "../util"
import EventHandler from "../eventHandler"

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class Tooltip {
  constructor(map) {
    const tooltip = createElement('div', 'jvm-tooltip')

    this._map = map
    this._tooltip = document.body.appendChild(tooltip)

    this._bindEventListeners()

    return this
  }

  _bindEventListeners() {
    EventHandler.on(this._map.container, 'mousemove', event => {
      if (!this._tooltip.classList.contains('active')) {
        return
      }

      const container = findElement(this._map.container, '#jvm-regions-group').getBoundingClientRect()
      const space = 5 // Space between the cursor and tooltip element

      // Tooltip
      const { height, width } = this._tooltip.getBoundingClientRect()
      const topIsPassed = event.clientY <= (container.top + height + space)
      let top = event.pageY - height - space
      let left = event.pageX - width - space

      // Ensure the tooltip will never cross outside the canvas area(map)
      if (topIsPassed) { // Top:
        top += height + space

        // The cursor is a bit larger from left side
        left -= space * 2
      }

      if (event.clientX < (container.left + width + space)) { // Left:
        left = event.pageX + space + 2

        if (topIsPassed) {
          left += space * 2
        }
      }

      this._tooltip.style.cssText = `top: ${top}px; left: ${left}px`
    })
  }

  getElement() {
    return this._tooltip
  }

  show() {
    this._tooltip.classList.add('active')
  }

  hide() {
    this._tooltip.classList.remove('active')
  }

  text(string) {
    if (!string) {
      return this._tooltip.textContent
    }

    this._tooltip.textContent = string
  }
}

export default Tooltip