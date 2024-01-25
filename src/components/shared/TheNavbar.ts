import { NavbarConfig } from "../../config";

let theNavbarTemplate = document.createElement("template");
let theNavbarStyle = document.createElement("style");

class TheNavbar extends HTMLElement {
  private burgerMenu: FrieMenu | null | undefined;
  private sidebar: BaseSidebar | null | undefined;
  private isMenuActive: boolean;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(theNavbarTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(theNavbarStyle.cloneNode(true));

    this.burgerMenu = this.shadowRoot?.querySelector("frie-menu");
    this.sidebar = this.shadowRoot?.querySelector("base-sidebar");
    this.isMenuActive = false;
  }

  connectedCallback() {
    this.burgerMenu!.onclick = () => this.toggleMobileMenu();
    // use custom event to listen to sidebar's overlay click event
    this.sidebar?.addEventListener("custom:overlay-clicked", () =>
      this.overlayClickedHandler()
    );
  }

  disconnectedCallback() {
    this.burgerMenu!.onclick = null;
    this.sidebar?.removeEventListener("custom:overlay-clicked", () =>
      this.overlayClickedHandler()
    );
  }

  overlayClickedHandler() {
    this.burgerMenu?.closeMenu();
    this.isMenuActive = false;
  }

  toggleMobileMenu() {
    if (!this.isMenuActive) {
      this.sidebar?.openSidebar();
      this.burgerMenu?.openMenu();
    } else {
      this.sidebar?.closeSidebar();
      this.burgerMenu?.closeMenu();
    }

    this.isMenuActive = !this.isMenuActive;
  }
}

theNavbarTemplate.innerHTML = /* HTML */ `
  <header class="container">
    <div class="content">
      <img src="/svgs/IconLogo.svg" alt="tbc academy logo" height="41" />

      <nav>
        <ul class="navlinks">
          ${NavbarConfig.map(
            (navbarLink) => /* HTML */ `<li id="navlink-${navbarLink.id}">
              <a href="${navbarLink.link}" class="navlink">
                ${navbarLink.title}
              </a>
            </li>`
          ).join("")}
        </ul>
      </nav>

      <frie-menu></frie-menu>

      <base-sidebar>
        <nav>
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
        </nav>
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

  @media (min-width: 768px) {
    .content {
      justify-content: space-evenly;
      padding: 0;
    }
        
    .navlinks {
      display: flex;
    }
  }
`;

window.customElements.define("the-navbar", TheNavbar);
