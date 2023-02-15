/**
 * The emmbryo-item-row web component module.
 *
 * @author Emma Fransson <info@emmbryo.se>
 * @version 1.0.1
 */

import { items } from './items'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    #container {
      padding: 5px;
      width: 290px;
      display: grid;
      border-radius: 5px;
      border: solid 2px black;
      grid-template-rows: 70px;
      grid-template-columns: 75px 75px 75px 75px;      
    }
    #first, #second, #third, #fourth {
      width: 60px;
      height: 60px;
    }
    .hidden {
      background-color: red;
    }
    #first, #second, #third, #fourth {
      border-radius: 50%;
      text-align: center;
      border: solid 2px black;
    }
    .coral {
      background-color: coral;
    }
    .pink {
      background-color: rgb(236, 86, 191);
    }
    .green {
      background-color: rgb(75, 197, 75);
    }
    .brown {
      background-color: rgb(177, 101, 62);
    }
    .petrol {
      background-color: rgb(30, 150, 148);
    }
    .yellow {
      background-color: rgb(240, 178, 56);
    }
  </style>
  <div id="container">
    <div id="first">
    </div>
    <div id="second">
    </div>
    <div id="third">
    </div>
    <div id="fourth">
    </div>
  </div>
`
customElements.define('emmbryo-item-row',
  /**
   * Represents a flipping tile.
   */
  class extends HTMLElement {
    /**
     * The element representing the row.
     */
    #row

    /**
     * Selectors for image elements.
     */
    #selectors = ['#first', '#second', '#third', '#fourth']

    /**
     * Holds the result for the played game, to set the status square.
     */
    #resultFromPlay = []

    /**
     * The array that containts the current items of the row.
     */
    #rowItems = []

    /**
     * The specifications of the different items.
     */
    #items = items

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
      this.#row = this.shadowRoot.querySelector('#container')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['color', 'clear', 'play']
    }

    /**
     * Called if observed attribute/attributes change.
     *
     * @param {string} name Name of attribute.
     * @param {*} oldValue Old Value of attribute.
     * @param {*} newValue New value of attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'color') {
        this.#row.setAttribute('color', newValue)
        this.#rowItems.push(newValue)
        this.#updateRow()
      } else if (name === 'clear') {
        this.#clearRow()
        this.#updateRow()
      } else if (name === 'play') {
        this.#checkAnswer(newValue)
      }
    }

    /**
     * Checks if the row matches the master row.
     *
     * @param {*} answer the master row to compare this.#row to.
     */
    #checkAnswer (answer) {
      // console.log(answer)
      if (this.#rowItems.length < 4) {
        console.log('row not filled')
      } else {
        this.#compareRows(answer)
        this.#freezeRow()
      }
    }

    /**
     * Compares the rows.
     *
     * @param {*} answer the master row to compare this.#row to.
     */
    #compareRows (answer) {
      const masterRow = answer.split(' ')
      for (let i = 0; i < masterRow.length; i++) {
        if (masterRow[i] === this.#rowItems[i]) {
          masterRow[i] = ''
          this.#rowItems[i] = '*'
          this.#addMatch()
        }
      }
      for (let i = 0; i < this.#rowItems.length; i++) {
        if (masterRow.includes(this.#rowItems[i])) {
          masterRow.splice(masterRow.indexOf(this.#rowItems[i]), 1)
          this.#addColorMatch()
        }
      }

      this.dispatchEvent(new CustomEvent('result', {
        bubbles: true,
        detail: { result: this.#resultFromPlay }
      }))
    }

    /**
     * Adds a match.
     */
    #addMatch () {
      this.#resultFromPlay.push('1')
    }

    /**
     * Adds a color match.
     */
    #addColorMatch () {
      this.#resultFromPlay.push('0')
    }

    /**
     * Dispatches a freeze event to signal that the row is no longer available.
     */
    #freezeRow () {
      this.dispatchEvent(new CustomEvent('freeze', {
        bubbles: true
      }))
    }

    /**
     * Adds picture to row.
     */
    #updateRow () {
      if (this.#rowItems.length <= 4) {
        this.#fillRow()
      } else if (this.#rowItems.length < 1) {
        console.log('No items in the row')
      } else {
        // alert('The row is filled. Please play or delete it.')
        console.log('The row i s filled. Delete or play.')
      }
    }

    /**
     * Adds default picture to row.
     */
    #clearRow () {
      for (let i = 0; i < this.#rowItems.length; i++) {
        this.shadowRoot.querySelector(this.#selectors[i]).removeAttribute('class')
      }
      this.#rowItems = []
    }

    /**
     * Fills the row.
     */
    #fillRow () {
      for (let i = 0; i < this.#rowItems.length; i++) {
        for (let j = 0; j < this.#items.length; j++) {
          if (this.#items[j].id === this.#rowItems[i]) {
            this.shadowRoot.querySelector(this.#selectors[i]).setAttribute('class', this.#items[j].color)
          }
        }
      }
    }
  })
