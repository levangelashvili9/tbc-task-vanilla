import { NavbarConfig } from "../../config";

let theNavbarTemplate = document.createElement("template");
let theNavbarStyle = document.createElement("style");

class TheNavbar extends HTMLElement {
  private burgerMenu: HTMLElement | null | undefined;
  private sidebar: BaseSidebar | null | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(theNavbarTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(theNavbarStyle.cloneNode(true));

    this.burgerMenu = this.shadowRoot?.querySelector(".menu");
    this.sidebar = this.shadowRoot?.querySelector("base-sidebar");
  }

  connectedCallback() {
    this.burgerMenu!.onclick = () => this.toggleMobileMenu();
  }

  disconnectedCallback() {
    this.burgerMenu!.onclick = null;
  }

  toggleMobileMenu() {
    if (this.burgerMenu!.classList.contains("menu-open")) {
      this.sidebar?.closeSidebar();
      this.burgerMenu!.classList.remove("menu-open");
    } else {
      this.sidebar?.openSidebar();
      this.burgerMenu!.classList.add("menu-open");
    }
  }
}

theNavbarTemplate.innerHTML = /* HTML */ `
  <header class="container">
    <div class="content">
      <img src="/svgs/IconLogo.svg" alt="tbc academy logo" height="41" />
      <ul class="navlinks">
        ${NavbarConfig.map(
          (navbarLink) => /* HTML */ `<li id="navlink-${navbarLink.id}">
            <a href="${navbarLink.link}" class="navlink">
              ${navbarLink.title}
            </a>
          </li>`
        ).join("")}
      </ul>
      <div class="menu">
        <span class="line-top"></span>
        <span class="line-middle"></span>
        <span class="line-bottom"></span>
      </div>
      <base-sidebar>
        <ul class="sidebar-navlinks">
          ${NavbarConfig.map(
            (navbarLink) => /* HTML */ `<div
              class="sidebar-navlink-container"
              id="sidebar-navlink-${navbarLink.id}"
            >
              <li>
                <a href="${navbarLink.link}" class="navlink"
                  >${navbarLink.title}</a
                >
              </li>
            </div>`
          ).join("")}
        </ul>
      </base-sidebar>
    </div>
  </header>
`;

theNavbarStyle.textContent = `
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
    z-index: 2;
        
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
    text-decoration: none;
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
