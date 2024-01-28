class BaseSidebar extends HTMLElement {
  private overlay: HTMLElement | null | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();

    this.overlay = this.shadowRoot?.querySelector(".overlay");

    this.style.width = this.getAttribute("width") || "60%";
    this.style.backgroundColor = this.getAttribute("color") || "#222222";
  }

  connectedCallback() {
    this.overlay!.onclick = () => {
      this.closeSidebar();
      // create custom event to handle overlay click in parent component
      this.dispatchEvent(new CustomEvent("custom:overlay-clicked"));
    };
  }

  disconnectedCallback() {
    this.overlay!.onclick = () => null;
  }

  openSidebar() {
    this.style.right = "0";
    this.overlay!.classList.add("overlay-open");

    if (this.getAttribute("scrollable") !== "true") {
      document.body.style.overflow = "hidden";
    }
  }

  closeSidebar() {
    this.style.right = "-100%";
    this.overlay!.classList.remove("overlay-open");

    if (this.getAttribute("scrollable") !== "true") {
      document.body.style.overflow = "auto";
    }
  }

  render() {
    let template = /* HTML */ `
      <slot></slot>
      <div class="overlay"></div>
    `;

    let style = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "tbc-font";
      }  
    
      :host {
        position: fixed;
        top: 0;
        right: -100%;
        height: 100vh;   
        overflow-y: scroll;
    
        background-color: #222222;
        transition: all 0.5s;
        z-index: 4;
      }
    
      .overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;   
    
        background-color: rgba(34, 34, 34, 0.5);
        transition: all 0.5s;
        z-index: -1;
      }
    
      .overlay-open {
        display: block;
      }
    
      @media (min-width: 768px) {
        :host {
          width: 60% !important;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
    
        :host::-webkit-scrollbar {
          display: none;
        }
      }
      
      @media (min-width: 1024px) {
        :host {
          width: 45% !important;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("base-sidebar", BaseSidebar);
