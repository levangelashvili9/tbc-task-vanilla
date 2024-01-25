let baseSidebarTemplate = document.createElement("template");
let baseSideBarStyle = document.createElement("style");

class BaseSidebar extends HTMLElement {
  private sidebar: HTMLElement | null | undefined;
  private overlay: HTMLElement | null | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(baseSidebarTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(baseSideBarStyle.cloneNode(true));

    this.sidebar = this.shadowRoot?.querySelector(".sidebar");
    this.overlay = this.shadowRoot?.querySelector(".overlay");

    this.sidebar!.style.width = this.getAttribute("width") || "60%";
    this.sidebar!.style.backgroundColor =
      this.getAttribute("color") || "#222222";
  }

  connectedCallback() {
    this.overlay!.onclick = () => this.closeSidebar();
  }

  disconnectedCallback() {
    this.overlay!.onclick = () => null;
  }

  openSidebar() {
    this.sidebar!.classList.add("sidebar-open");
    this.sidebar!.style.right = "0";

    this.overlay!.classList.add("overlay-open");

    if (!this.getAttribute("scrollable")) {
      document.body.style.overflow = "hidden";
    }
  }

  closeSidebar() {
    this.sidebar!.classList.remove("sidebar-open");
    this.sidebar!.style.right = "-100%";

    this.overlay!.classList.remove("overlay-open");

    if (!this.getAttribute("scrollable")) {
      document.body.style.overflow = "auto";
    }
  }
}

baseSidebarTemplate.innerHTML = /* HTML */ `
  <div class="sidebar">
    <slot></slot>
  </div>
  <div class="overlay"></div>
`;

baseSideBarStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "tbc-font";
  }  

  .sidebar {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;   
    overflow-y: scroll;

    background-color: #222222;
    transition: all 0.5s;
    z-index: 4;
  }

  .sidebar-open {
    right: 0;
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
    z-index: 3;
  }

  .overlay-open {
    display: block;
  }

  @media (min-width: 768px) {
    .sidebar {
      width: 60% !important;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .sidebar::-webkit-scrollbar {
      display: none;
    }
  }
  
  @media (min-width: 1024px) {
    .sidebar {
      width: 45% !important;
    }
  }
`;

window.customElements.define("base-sidebar", BaseSidebar);