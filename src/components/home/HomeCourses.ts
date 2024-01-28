import { CoursesConfig } from "../../config";

class HomeCourses extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    let template = /* HTML */ `
      <section class="courses-container">
        <h2 class="courses-heading">სასწავლო კურსები</h2>

        <div class="courses-list">
          ${CoursesConfig.map(
            (course) => /* HTML */ ` <home-courses-card
              id="${course.id}"
              image="${course.image}"
              link="${course.link}"
              status="${course.status}"
              title="${course.title}"
            ></home-courses-card>`
          ).join("")}
        </div>
      </section>
    `;

    let style = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "tbc-font";
      }
        
      .courses-container {
        background-color: #161616;
        padding: 1.5rem 1.5rem 2.5rem 1.5rem;
      }
    
      .courses-heading {
        font-size: 24px;
        font-weight: 500;
        color: #F4F4F4;
        letter-spacing: 1px;
        margin-bottom: 1.5rem;
      }
    
      .courses-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    
      @media (min-width: 546px) {
        .courses-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);;
        }
      }
    
      @media (min-width: 768px) {
        .courses-container {
          padding: 2.5rem 5rem;
        }
    
        .courses-heading {
          margin-bottom: 2.5rem;
        }
      }
    
      @media (min-width: 1024px) {
        .courses-heading {
          margin-bottom: 4rem;
        }
      }

      @media (min-width: 1080px) {
        .courses-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);;
        }
      }
    
      @media (min-width: 1450px) {
        .courses-container {
          padding: 1.5rem 16.75rem 2.5rem 16.75rem;
        }
      }
    `;
    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("home-courses", HomeCourses);
