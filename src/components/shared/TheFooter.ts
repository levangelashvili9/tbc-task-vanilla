import { TermsConfig } from "../../config";

class TheFooter extends HTMLElement {
  private sidebar: BaseSidebar | null | undefined;
  private terms: HTMLElement | null | undefined;
  private SidebarCloseSvg: HTMLElement | null | undefined;
  private SidebarCloseButton: HTMLElement | null | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();

    this.sidebar = this.shadowRoot?.querySelector("base-sidebar");
    this.terms = this.shadowRoot?.querySelector(".terms");
    this.SidebarCloseSvg = this.shadowRoot?.querySelector(".sidebar-close-svg");
    this.SidebarCloseButton = this.shadowRoot?.getElementById(
      "sidebar-close-button"
    );
  }

  connectedCallback() {
    this.terms!.onclick = () => this.sidebar?.openSidebar();
    this.SidebarCloseSvg!.onclick = () => this.sidebar?.closeSidebar();
    this.SidebarCloseButton!.onclick = () => this.sidebar?.closeSidebar();
  }

  disconnectedCallback() {
    this.terms!.onclick = () => null;
    this.SidebarCloseSvg!.onclick = () => null;
    this.SidebarCloseButton!.onclick = () => null;
  }

  render() {
    let template = /* HTML */ `
      <footer class="container">
        <img src="/images/tbc-logo.png" alt="tbc logo" class="tbc-logo" />

        <div class="contact">
          <a href="mailto:itacademy@tbcbank.com.ge">
            <base-button type="primary">მოგვწერეთ</base-button>
          </a>
          <div class="socials-wrapper">
            <a href="https://www.facebook.com/tbcbank/" target="_blank">
              <img
                src="/images/facebook.png"
                alt="facebook logo"
                class="facebook-logo"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCGk9R2LV2ywOL80r8Xc6xtQ"
              target="_blank"
            >
              <img
                src="/images/youtube.png"
                alt="youtube logo"
                class="youtube-logo"
              />
            </a>
          </div>
        </div>

        <div class="terms-and-rights">
          <h4 class="terms">წესები და პირობები</h4>
          <h4 class="rights">© 2023 ყველა უფლება დაცულია</h4>
        </div>

        <base-sidebar scrollable="true" width="85%" color="#2B2B2B">
          <img
            src="/svgs/IconCross.svg"
            alt="cross svg"
            class="sidebar-close-svg"
          />
          <div class="terms-content">
            ${TermsConfig.map(
              (term) => /* HTML */ `<article
                class="term-item"
                id="term-${term.id}"
              >
                <h3 class="term-title">${term.title}</h3>
                <div class="term-paragraphs">
                  ${term.paragraphs
                    .map((paragraph) => `<p>${paragraph}</p>`)
                    .join("")}
                </div>
              </article>`
            ).join("")}
            <base-button type="secondary" id="sidebar-close-button"
              >დახურვა</base-button
            >
          </div>
        </base-sidebar>
      </footer>
    `;

    let style = `
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
    
      .sidebar-close-svg {
        position: absolute;
        top: 30px;
        right: 30px;
    
        width: 24px;
        height: 24px;
    
        cursor: pointer;
      }
    
      .terms-content {
        padding: 4.25rem 1.25rem;
        color: #8C8C8C;
      }
    
      .term-title {
        margin-bottom: 1.5rem;
        font-size: 16px;
      }
    
      #term-0 .term-title {
        font-size: 21px;
      }
    
      .term-paragraphs p {
        font-size: 14px;
        line-height: 1.4rem;
        margin-bottom: 1.25rem;
      }
    
      .rights {
        color: #F4F4F4;
        font-weight: 400;
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
    
        .socials-wrapper {
          justify-content: flex-end;
        }
    
        .terms-and-rights {
          flex-direction: column-reverse;
        }
    
        .term-paragraphs p {
          line-height: 1.3rem;
        }
      }
    
      @media (min-width: 1024px) {
        .terms-content {
          padding: 5rem 3.5rem;
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

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("the-footer", TheFooter);
