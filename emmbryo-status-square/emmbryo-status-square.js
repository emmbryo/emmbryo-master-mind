/**
 * The emmbryo-status-square web component module.
 *
 * @author Emma Fransson <info@emmbryo.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    #container {
      width: 60px;
      display: grid;
      border-radius: 5px;
      border: solid 1px black; 
      background-color: #99dade;
      grid-template-rows: 30px 30px;
      grid-template-columns: 30px 30px;
    }
    .status-pin {
      padding: 0;
      margin: 6px;
      width: 18px;
      height: 18px;
      color: #99dade;
      border-radius: 50%;
      text-align: center;
    }
    .correct-place {
      color: black;
      background-color: black;
    }
    .correct-color {
      color: white;
      background-color: white;
    }
  </style>

  <div id="container" config="">
    <div id="top-left" class="status-pin">*</div>
    <div id="top-right" class="status-pin">*</div>
    <div id="bottom-left" class="status-pin">*</div>
    <div id="bottom-right" class="status-pin">*</div>
  </div>
`
customElements.define('emmbryo-status-square',
  /**
   * Represents a flipping tile.
   */
  class extends HTMLElement {
    /**
     * The element representing the status square.
     */
    #statusSquare

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
      this.#statusSquare = this.shadowRoot.querySelector('#container')
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#configStatusPins()
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['config']
    }

    /**
     * Called if observed attribute/attributes change.
     *
     * @param {string} name Name of attribute.
     * @param {*} oldValue Old Value of attribute.
     * @param {*} newValue New value of attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'config' && newValue !== oldValue) {
        this.#statusSquare.setAttribute('config', newValue)
        this.#configStatusPins()
      }
    }

    /**
     * Fills an array with the four status pin elements.
     */
    #configStatusPins () {
      const ids = ['#top-left', '#top-right', '#bottom-left', '#bottom-right']
      let statuses = this.#statusSquare.getAttribute('config').split(' ')
      statuses = statuses.slice(0, 4)

      if (statuses) {
        for (let i = 0; i < statuses.length; i++) {
          const classValue = 'status-pin ' + statuses[i]
          this.shadowRoot.querySelector(ids[i]).setAttribute('class', classValue)
        }
      }
    }
  })
