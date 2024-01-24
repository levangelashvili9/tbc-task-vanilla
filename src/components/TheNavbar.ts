import { NavbarConfig } from "../config";

const navbarTemplate = document.createElement("template");
const navbarStyle = document.createElement("style");

class TheNavbar extends HTMLElement {
  private burgerMenu: HTMLElement;
  private sidebar: HTMLElement;
  private overlay: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(navbarTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(navbarStyle.cloneNode(true));

    this.burgerMenu = this.shadowRoot?.querySelector(".menu") as HTMLElement;
    this.sidebar = this.shadowRoot?.querySelector(".sidebar") as HTMLElement;
    this.overlay = this.shadowRoot?.querySelector(".overlay") as HTMLElement;
  }

  connectedCallback() {
    this.burgerMenu.onclick = () => this.toggleSidebarMenu();
    this.overlay.onclick = () => this.toggleSidebarMenu();
  }

  disconnectedCallback() {
    this.burgerMenu.onclick = null;
    this.overlay.onclick = null;
  }

  toggleSidebarMenu() {
    document.body.style.overflow =
      document.body.style.overflow === "hidden" ? "auto" : "hidden";

    this.burgerMenu.classList.toggle("menu-open");
    this.sidebar.classList.toggle("sidebar-open");
    this.overlay.classList.toggle("overlay-active");
  }
}

navbarTemplate.innerHTML = /* HTML */ `
  <div class="container">
    <div class="content">
      <img src="/svgs/IconLogo.svg" alt="tbc academy logo" height="41" />
      <ul class="navlinks">
        ${NavbarConfig.map(
          (navbarLink) => /* HTML */ `<li
            class="navlink"
            id="navlink-${navbarLink.id}"
          >
            ${navbarLink.title}
          </li>`
        ).join("")}
      </ul>
      <div class="menu">
        <span class="line-top"></span>
        <span class="line-middle"></span>
        <span class="line-bottom"></span>
      </div>
      <div class="sidebar">
        <ul class="sidebar-navlinks">
          ${NavbarConfig.map(
            (navbarLink) => /* HTML */ `<div
              class="sidebar-navlink-container"
              id="sidebar-navlink-${navbarLink.id}"
            >
              <li class="sidebar-navlink">${navbarLink.title}</li>
            </div>`
          ).join("")}
        </ul>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
`;

navbarStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "tbc-font";
  }

  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5.25rem;
    z-index: 100;
        
    display: flex;
    align-items: center;

    background-color: #1A1E1F;
  }

  .content {
    width: 100%;
        
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 1.5rem;
  }

  img {
    cursor: pointer;
  }

  .navlinks {
    display: none;
    align-items: center;
    gap: 2.5rem;
    list-style: none;
  }

  .navlink {
    color: white;
    cursor: pointer;
    transition: all 0.4s;
  }

  .navlink:hover {
    color: #00A3E0;
  }

  .sidebar-navlinks {
    list-style: none;
    padding-top: 4rem;
    padding-right: 1rem;
  }

  .sidebar-navlink-container {
    height: 3.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .sidebar-navlink {
    color: white;
    cursor: pointer;
    transition: all 0.4s;
  }

  .menu {
    width: 1.625rem;
        
    background: blue;
    position: relative;
    cursor: pointer;

    z-index: 100;
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

  .menu-open .line-top {
    transform: translate(0, 0) rotate(-135deg);
    background-color: #767676;
  }

  .menu-open .line-middle {
    transform: translate(-45%, -90%) rotate(-45deg);
    background-color: #767676;
  }

  .menu-open .line-bottom {
    transform: translate(-100%, 0) rotate(-135deg);
    background-color: #767676;
  }

  .overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;   

    background-color: rgba(34, 34, 34, 0.5);
    transition: all 0.5s;
    z-index: 40;
  }

  .overlay-active {
    display: block;
  }

  .sidebar {
    position: absolute;
    top: 0;
    right: -60%;
    height: 100vh;
    width: 60%;   

    background-color: #222222;
    transition: all 0.5s;
    z-index: 50;
  }

  .sidebar-open {
    right: 0;
  }

  @media (min-width: 768px) {
    .content {
      justify-content: space-evenly;
      padding: 0;
    }
        
    .navlinks {
      display: flex;
    }

    .menu {
      display: none;
    }
        
    .sidebar {
      display: none;
    }

    .overlay {
      display: none;
    }
  }
`;

window.customElements.define("the-navbar", TheNavbar);
