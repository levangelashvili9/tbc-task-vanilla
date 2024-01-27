class BaseButton extends HTMLElement {
  private button: HTMLElement | null | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();

    this.button = this.shadowRoot?.querySelector(".container");

    const typeAttribute = this.getAttribute("type");
    if (typeAttribute === "primary" || typeAttribute === "secondary") {
      this.button?.classList.add(typeAttribute);
    } else {
      this.button?.classList.add("primary");
    }
  }

  render() {
    let template = /* HTML */ ` <button class="container">
      <slot></slot>
    </button>`;

    let style = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "tbc-font";
      }
    
      .container {
        border: none;
        border-radius: 6px;
        transition: all 0.4s;
        cursor: pointer;
      }
    
      .primary {
        background-color: #00AEF3;
        color: white;
        width: 110px;
        height: 36px;
      }

      .primary:hover {
        background-color: #D5D5D5;
        color: #783131;
      }

      .secondary {
        width: 100%;
        height: 2.5rem;

        font-size: 18px;
        font-weight: bold;
        background-color: #DBDBDB;
      }

      .secondary:hover {
        background-color: #00AEF3;
        color: white;
      }

      @media (min-width: 768px) {
        .primary {
          width: 160px;
          font-size: 16px;
        }

        .secondary {
          height: 3rem;
        }
      }

      @media (min-width: 1024px) {
        .secondary {
          height: 3.75rem;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("base-button", BaseButton);
