/**
 * The emmbryo-master-item web component module.
 *
 * @author Emma Fransson <info@emmbryo.se>
 * @version 1.0.1
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    button {
      width: 70px;
      height: 70px;
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
  <button class="item">
    <slot name="color">
    </slot>
  </button>  
`
customElements.define('emmbryo-master-item',
  /**
   * Represents a flipping tile.
   */
  class extends HTMLElement {
    /**
     * The element representing the tile.
     */
    #item

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
      this.#item = this.shadowRoot.querySelector('.item')

      this.#item.addEventListener('click', (event) => {
        this.dispatchEvent(new CustomEvent('choice', {
          bubbles: true,
          detail: { color: this.getAttribute('class'), id: this.getAttribute('class') }
        }))
      })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['class']
    }

    /**
     * Called if observed attribute/attributes change.
     *
     * @param {string} name Name of attribute.
     * @param {*} oldValue Old Value of attribute.
     * @param {*} newValue New value of attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'class' && newValue !== oldValue) {
        this.#item.setAttribute('class', newValue)
      }
    }
  })
