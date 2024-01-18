import { NavbarConfig } from "../config";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        .navbar-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 5.25rem;
            
            display: flex;
            align-items: center;

            background-color: #1A1E1F;
        }

        
        .navbar-content {
            width: 100%;

            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }

        .navbar-link-items {
            display: flex;
            align-items: center;
            gap: 2.5rem;

            list-style: none;
        }

        .navbar-link-item {
            color: white;
            cursor: pointer;

            transition: all 0.4s;
        }

        .navbar-link-item:hover {
            color: #00A3E0;
        }

        img {
            cursor: pointer;
        }

    </style>

    <div class="navbar-container">
        <div class="navbar-content">
            <img src="/main-logo.svg" alt="tbc academy logo" height="41"/>
            <ul class="navbar-link-items">
                ${NavbarConfig.map(
                  (navbarLink) =>
                    `<li class="navbar-link-item">${navbarLink.title}</li>`
                ).join("")}
            </ul>
        </div>
    </div>
`;

class NavigationBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("navigation-bar", NavigationBar);
