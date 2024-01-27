import { FaqConfig } from "../../config";

class HomeFaq extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    let template = /* HTML */ `
      <section class="faq-container">
        <header>
          <h2 class="faq-heading">ხშირად დასმული კითხვები</h2>
          <a
            href="https://www.tbcacademy.ge/usaid-faq"
            class="faq-learn-more-desktop"
            >ყველა კითხვა</a
          >
        </header>

        <div class="faq-accordion">
          ${FaqConfig.map(
            (question) => /* HTML */ `<home-faq-question
              id="${question.id}"
              title="${question.title}"
              answer="${question.answer}"
            ></home-faq-question>`
          ).join("")}
        </div>

        <a
          href="https://www.tbcacademy.ge/usaid-faq"
          class="faq-learn-more-mobile"
          >ყველა კითხვა</a
        >
      </section>
    `;

    let style = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "tbc-font";
      }
    
      .faq-container {
        padding: 3rem 1.5rem;
        background-color: #161616;
        color: #F4F4F4;
      }
    
      header {
        margin-bottom: 2.5rem;
      }
    
      .faq-heading {
        font-weight: 500;
      }
    
      .faq-accordion {
        display: flex;
        flex-direction: column;
        gap: 1.375rem;
        
        margin-bottom: 3rem;
      }
    
      .faq-learn-more-mobile, .faq-learn-more-desktop {
        display: block;
        text-align: center;
        color: #00AEF3;
        cursor: pointer;
        font-size: 20px;
        font-weight: 700;
        text-decoration: none;
      }
    
      .faq-learn-more-desktop {
        display: none;
      }
    
      @media (min-width: 768px) {
        .faq-container {
          padding: 2.5rem 5rem;
        }
    
        header {
          margin-bottom: 3rem;
        }
      }
    
      @media (min-width: 1024px) {
        .faq-container {
          padding: 4rem 5rem 2.5rem;
        }
    
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
    
        .faq-learn-more-mobile {
          display: none;
        }
    
        .faq-learn-more-desktop {
          display: block;
        }
      }
    
      @media (min-width: 1280px) {
        .faq-container {
          padding: 6rem 16.75rem 2.5rem;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("home-faq", HomeFaq);
