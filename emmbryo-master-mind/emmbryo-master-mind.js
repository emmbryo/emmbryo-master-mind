/**
 * The emmbryo-master-mind web component module.
 *
 * @author Emma Fransson <info@emmbryo.se>
 * @version 1.0.0
 */

import { template } from './emmbryo-master-mind-template'
import { items } from './items'
import '../emmbryo-item-row/index'
import '../emmbryo-master-item/index'
import '../emmbryo-status-square/index'

customElements.define('emmbryo-master-mind',
  /**
   * Represents a master mind game.
   */
  class extends HTMLElement {
    /**
     * The element representing the different items in the game.
     */
    #items = items

    /**
     * The current row that is being played. Starts at 1.
     */
    #noOfRows = 8

    /**
     * The current row that is being played. Starts at 1.
     */
    #currentRow = 1

    /**
     * The current row that is being played. Starts at 1.
     */
    #currentStatusSquare = 1

    /**
     * Selector for the current row.
     */
    #currentRowId

    /**
     * Selector for the current row.
     */
    #currentStatusSquareId

    /**
     * The master row, answer, of the current game.
     */
    #masterRow = []

    /**
     * Possible to delete row or not.
     */
    #deletePossible = true

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
      this.#makeRows()
      this.#makeRightSide()
      this.#makeLeftSide()
      this.#setMasterRow()

      this.#currentRowId = '#row' + this.#currentRow
      this.#currentStatusSquareId = '#square' + this.#currentStatusSquare

      this.shadowRoot.querySelector('#left-side').addEventListener('choice', (event) => {
        event.stopPropagation()
        this.#updateCurrentRow(event.detail)
      })

      this.shadowRoot.querySelector('#delete').addEventListener('click', (event) => {
        event.stopPropagation()
        this.#clearCurrentRow()
      })

      this.shadowRoot.querySelector('#play').addEventListener('click', (event) => {
        event.stopPropagation()
        this.#playRow()
      })

      this.shadowRoot.querySelector('#rows-container').addEventListener('freeze', (event) => {
        event.stopPropagation()
        this.#freezeCurrentRow()
      })

      this.shadowRoot.querySelector('#rows-container').addEventListener('result', (event) => {
        event.stopPropagation()
        this.#configStatusSquare(event.detail.result)
        this.#checkWinner(event.detail.result)
      })

      this.shadowRoot.querySelector('#restart').addEventListener('click', (event) => {
        this.#resetGame()
      })
    }

    /**
     * Called if observed attribute/attributes change.
     *
     * @param {string} name Name of attribute.
     * @param {*} oldValue Old Value of attribute.
     * @param {*} newValue New value of attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
    }

    /**
     * Updates the current row, based on chosen item.
     *
     * @param {*} detail Info containing id of the clicked.
     */
    #updateCurrentRow (detail) {
      this.shadowRoot.querySelector(this.#currentRowId).setAttribute('color', detail.color)
    }

    /**
     * Clears the current row when delete button clicked.
     */
    #clearCurrentRow () {
      if (this.#deletePossible) {
        this.shadowRoot.querySelector(this.#currentRowId).setAttribute('clear', '')
      }
    }

    /**
     * Plays the row.
     */
    #playRow () {
      const answer = this.#getMasterRowIds().join(' ')
      this.shadowRoot.querySelector(this.#currentRowId).setAttribute('play', answer)
      if (this.#currentRow === 10) {
        this.#deletePossible = false
      }
    }

    /**
     * Configureates the status square for the current row.
     *
     * @param {string[]} result tha result from the item row.
     */
    #configStatusSquare (result) {
      const statusSquareInfo = []
      for (let i = 0; i < result.length; i++) {
        if (result[i] === '1') {
          statusSquareInfo.push('correct-place')
        } else if (result[i] === '0') {
          statusSquareInfo.push('correct-color')
        }
      }

      this.shadowRoot.querySelector(this.#currentStatusSquareId).setAttribute('config', statusSquareInfo.join(' '))
    }

    /**
     * Checks if all items are correct.
     *
     * @param {string[]} result The array with the result.
     */
    #checkWinner (result) {
      if (result.length === 4 && result.every((element) => element === '1')) {
        this.#theGameIsWon()
      }
    }

    /**
     * Config the UI to display winning game.
     */
    #theGameIsWon () {
      const p = document.createElement('h1')
      const text = document.createTextNode('You win!')
      p.appendChild(text)
      this.shadowRoot.querySelector('#rows').replaceChildren(p)
      const row = document.createElement('emmbryo-item-row')
      const masterItems = this.#getMasterRowIds()
      for (let i = 0; i < masterItems.length; i++) {
        row.setAttribute('color', masterItems[i])
      }
      this.shadowRoot.querySelector('#master-row-container').replaceChildren(row)
    }

    /**
     * Resets the game.
     */
    #resetGame () {
      this.#setMasterRow()
      this.shadowRoot.querySelector('#rows').remove()
      const newRowsDiv = document.createElement('div')
      newRowsDiv.setAttribute('id', 'rows')
      this.shadowRoot.querySelector('#rows-container').appendChild(newRowsDiv)
      this.#makeRows()

      this.#currentRow = 1
      this.#currentRowId = '#row' + this.#currentRow
      this.#currentStatusSquare = 1
      this.#currentStatusSquareId = '#square' + this.#currentStatusSquare

      this.shadowRoot.querySelector('#right-side').remove()
      const newRightDiv = document.createElement('div')
      newRightDiv.setAttribute('id', 'right-side')
      this.shadowRoot.querySelector('#right-side-container').appendChild(newRightDiv)
      this.#makeRightSide()

      const masterRow = document.createElement('emmbryo-item-row')
      this.shadowRoot.querySelector('#master-row-container').replaceChildren(masterRow)
    }

    /**
     * Fills up the rows.
     */
    #makeRows () {
      let row, id
      for (let i = 0; i < this.#noOfRows; i++) {
        row = document.createElement('emmbryo-item-row')
        id = 'row' + (i + 1)
        row.setAttribute('id', id)
        this.shadowRoot.querySelector('#rows').appendChild(row)
      }
    }

    /**
     * Updates the current row.
     */
    #freezeCurrentRow () {
      if (this.#currentRow < 10) {
        this.#currentRow++
        this.#currentRowId = '#row' + this.#currentRow
        this.#currentStatusSquare++
        this.#currentStatusSquareId = '#square' + this.#currentStatusSquare
      } else {
        console.log('game over')
      }
    }

    /**
     * Fills the right side.
     */
    #makeRightSide () {
      let square, id
      for (let i = 0; i < this.#noOfRows; i++) {
        square = document.createElement('emmbryo-status-square')
        id = 'square' + (i + 1)
        square.setAttribute('id', id)
        this.shadowRoot.querySelector('#right-side').appendChild(square)
      }
    }

    /**
     * Fills the left side.
     */
    #makeLeftSide () {
      let sideItemElement, div
      for (let i = 0; i < this.#items.length; i++) {
        sideItemElement = document.createElement('emmbryo-master-item')
        div = document.createElement('div')
        div.setAttribute('slot', 'color')
        div.setAttribute('id', this.#items[i].id)
        div.setAttribute('width', '60px')
        sideItemElement.appendChild(div)
        sideItemElement.setAttribute('class', this.#items[i].color)
        this.shadowRoot.querySelector('#left-side').appendChild(sideItemElement)
      }
    }

    /**
     * Sets the master row (the answer) of the current game.
     */
    #setMasterRow () {
      this.#masterRow = []
      const ids = []
      this.#items.forEach(element => {
        ids.push(element.id)
      })

      const max = this.#items.length

      for (let i = 0; i < 4; i++) {
        this.#masterRow.push(this.#items[Math.floor(Math.random() * max)])
      }
    }

    /**
     * Get the ids from the master row.
     *
     * @returns {string[]} array with master row ids.
     */
    #getMasterRowIds () {
      const ids = []
      this.#masterRow.forEach(item => {
        ids.push(item.id)
      })
      return ids
    }
  })
