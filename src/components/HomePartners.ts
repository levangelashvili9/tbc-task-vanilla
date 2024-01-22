const partnersTemplate = document.createElement("template");
const partnersStyle = document.createElement("style");

class HomePartners extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(partnersTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(partnersStyle.cloneNode(true));
  }
}

partnersTemplate.innerHTML = `
    <div class="container">
      <h2>პროექტის პარტნიორები</h2>
    </div>
`;

partnersStyle.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "tbc-font";
    }
    
    .container {
        padding: 1.5rem 1rem;
    }
`;

window.customElements.define("home-partners", HomePartners);
