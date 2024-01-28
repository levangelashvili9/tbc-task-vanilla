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
        <h2 class="faq-heading">ხშირად დასმული კითხვები</h2>

        <div class="faq-accordion">
          ${FaqConfig.map(
            (question) => /* HTML */ `<home-faq-question
              id="${question.id}"
              title="${question.title}"
              answer="${question.answer}"
            ></home-faq-question>`
          ).join("")}
        </div>

        <a href="https://www.tbcacademy.ge/usaid-faq" class="faq-learn-more"
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

        position: relative;
      }
    
      .faq-heading {
        margin-bottom: 2.5rem;
        font-weight: 500;
      }
    
      .faq-accordion {
        display: flex;
        flex-direction: column;
        gap: 1.375rem;
        
        margin-bottom: 3rem;
      }
    
      .faq-learn-more {
        display: block;
        text-align: center;
        color: #00AEF3;
        cursor: pointer;
        font-size: 20px;
        font-weight: 700;
        text-decoration: none;
      }
    
      @media (min-width: 768px) {
        .faq-container {
          padding: 2.5rem 5rem;
        }
    
        .faq-heading {
          margin-bottom: 3rem;
        }
      }
    
      @media (min-width: 1024px) {
        .faq-container {
          padding: 4rem 5rem 2.5rem;
        }
    
        .faq-learn-more {
          position: absolute;
          top: 4rem;
          right: 5rem;
        }
      }
    
      @media (min-width: 1450px) {
        .faq-container {
          padding: 6rem 19.25rem 2.5rem;

          .faq-learn-more {
            top: 6rem;
            right: 19.25rem;
          }
        }
      }
    `;

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("home-faq", HomeFaq);
