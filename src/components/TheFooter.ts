const footerTemplate = document.createElement("template");
const footerStyle = document.createElement("style");

class TheFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(footerTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(footerStyle.cloneNode(true));
  }

  connectedCallback() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const firstChild = document.body.firstChild;
    document.body.insertBefore(overlay, firstChild);
  }
}

footerTemplate.innerHTML = /* HTML */ `
  <div class="container">
    <img src="/images/tbc-logo.png" alt="tbc logo" class="tbc-logo" />
    <div class="contact">
      <button class="contact-email">მოგვწერეთ</button>
      <div class="socials-wrapper">
        <img
          src="/images/facebook.png"
          alt="facebook logo"
          class="facebook-logo"
        />
        <img
          src="/images/youtube.png"
          alt="youtube logo"
          class="youtube-logo"
        />
      </div>
    </div>
    <div class="terms-and-rights">
      <h4 class="terms">წესები და პირობები</h4>
      <h4 class="rights">© 2023 ყველა უფლება დაცულია</h4>
    </div>
    <div style="position: absolute; top: 0; left: 0; background: yellow;">
      sda
    </div>
  </div>
`;

footerStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "tbc-font";
  }

  .container {
    padding: 2rem 2rem 2.5rem;
    background-color: #1A1E1F;
  }

  .tbc-logo {
    width: 104px;
    height: 30px;

    margin-bottom: 2rem;
  }

  .contact {
    display: flex;
    justify-content: space-between;

    margin-bottom: 2.5rem;
  }

  .contact-email {
    background-color: #00AEF3;
    color: white;

    width: 110px;
    height: 36px;
    
    border: none;
    border-radius: 6px;
    transition: all 0.4s;
    cursor: pointer;
  }

  .contact-email:hover {
    background-color: #D5D5D5;
    color: #783131;
  }

  .socials-wrapper {
    display: flex;
    gap: 12px;
  }

  .socials-wrapper img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
  
  .terms-and-rights {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .terms {
    width: fit-content;
    color: #fff;
    font-weight: 400;

    transition: all 0.4s;
    cursor: pointer;
  }

  .terms:hover {
    opacity: 0.7;
  }

  .rights {
    color: #F4F4F4;
    font-weight: 400;
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

  .overlay {
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

  @media (min-width: 768px) {
    .container {
      position: relative;
      padding: 2.5rem 5rem;
    }

    .contact {
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;

      padding: 2.5rem 5rem 2.5rem 0;

      flex-direction: column-reverse;
      justify-content: space-between;
    }

    .contact-email {
      width: 160px;
      font-size: 16px;
    }

    .socials-wrapper {
      justify-content: flex-end;
    }

    .terms-and-rights {
      flex-direction: column-reverse;
    }
  }

  @media (min-width: 1280px) {
    .container {
      padding: 3.75rem 16.75rem;
    }

    .contact {
      padding: 3.75rem 16.75rem 3.75rem 0;
    }
  }
`;

window.customElements.define("the-footer", TheFooter);
