let frieMenuTemplate = document.createElement("template");
let frieMenuStyle = document.createElement("style");

class FrieMenu extends HTMLElement {
  private menu: HTMLElement | null | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(frieMenuTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(frieMenuStyle.cloneNode(true));

    this.menu = this.shadowRoot?.querySelector(".menu");
  }

  openMenu() {
    this.menu?.classList.add("menu-active");
  }

  closeMenu() {
    this.menu?.classList.remove("menu-active");
  }
}

frieMenuTemplate.innerHTML = /* HTML */ `
  <div class="menu">
    <span class="line-top"></span>
    <span class="line-middle"></span>
    <span class="line-bottom"></span>
  </div>
`;

frieMenuStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "tbc-font";
  }  

  .menu {
    width: 1.625rem;
        
    position: absolute;
    top: 50%;
    right: 1.5rem;
    
    background: blue;
    cursor: pointer;

    z-index: 5;
  }

  .menu span {
    height: 3px;
    width: 100%;
    background-color: #DBDBDB;
    border-radius: 1.5px;

    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.5s, width 0.5s;
  }

  .menu .line-top {
    width: 50%;
    transform: translate(-100%, -9px);
    transform-origin: 0 0;
  }

  .menu .line-bottom {
    width: 50%;
    right: 0;
    transform: translate(0, 6px);
    transform-origin: 100% 0;
  }

  .menu-active .line-top {
    transform: translate(0, 0) rotate(-135deg);
    background-color: #767676;
  }

  .menu-active .line-middle {
    transform: translate(-45%, -90%) rotate(-45deg);
    background-color: #767676;
  }

  .menu-active .line-bottom {
    transform: translate(-100%, 0) rotate(-135deg);
    background-color: #767676;
  }

  @media (min-width: 768px) {
    .menu {
      display: none;
    }
  }
`;

window.customElements.define("frie-menu", FrieMenu);
