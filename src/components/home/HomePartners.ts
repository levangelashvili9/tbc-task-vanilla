import { PartnersConfig } from "../../config";

class HomePartners extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    let template = /* HTML */ `
      <section class="partners-container">
        <h2 class="partners-heading">პროექტის პარტნიორები</h2>
        <base-carousel numOfSlides="3">
        ${PartnersConfig.map(
          (slide) => /* HTML */ `<div
            slot="slide-${slide.id}"
            class="partners-slide"
          >
            ${slide.images
              .map(
                (image) => /* HTML */ `<div
                  class="image-container"
                  id="slide-image-${image.id}"
                >
                  <img src="${image.src}" alt="${image.alt}" />
                </div>`
              )
              .join("")}
          </div>`
        ).join("")}
        <base-carousel>
      </section>
    `;

    let style = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "tbc-font";
      }
      
      .partners-container {
        background-color: #2B2B2B;
        padding: 1.5rem 0;
      }
      
      .partners-heading {
        margin-left: 1.5rem;
        margin-bottom: 4rem;
        color: #F4F4F4;
        font-weight: 500;
      }
      
      .partners-slide {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
      } 
    
      .image-container {
        display: flex;
        justify-content: center;
      }
    
      .image-container img {
        width: 14rem;
        height: auto;
        object-fit: contain;
      }
          
    
      @media (min-width: 768px) {
        .partners-container {
          padding: 2.5rem 0;
        }
              
        .partners-heading {
          margin-left: 5rem;
          margin-bottom: 3rem;
        }
    
        .partners-slide {
          flex-direction: row;
        }
      }
    
      @media (min-width: 1024px) {
        .partners-container {
          padding-bottom: 5rem;
        }
    
        .partners-heading {
          margin-bottom: 6rem;
        }
      }
    
      @media (min-width: 1200px) {
        .image-container img {
          width: 15rem;
        }
    
        .partners-slide {
          gap: 8rem;
        }
      }
    
      @media (min-width: 1280px) {
        .partners-heading {
          margin-left: 16.75rem;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("home-partners", HomePartners);
