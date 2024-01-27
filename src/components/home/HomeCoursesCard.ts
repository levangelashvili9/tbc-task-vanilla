class HomeCoursesCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();

    this.id = `course-${this.getAttribute("id")}`;
  }

  render() {
    let template = /* HTML */ `
      <div class="course-card">
        <div class="course-image">
          <img
            src="${this.getAttribute("image")}"
            alt="${this.getAttribute("title")} course photo"
          />
        </div>
        <div class="course-info">
          <div>
            <h3 class="course-info-title">${this.getAttribute("title")}</h3>
            <p class="course-info-status">${this.getAttribute("status")}</p>
          </div>
          <div class="course-learn-more">
            <img src="/svgs/IconArrowRight.svg" alt="arrow right svg" />
            <a
              href="${this.getAttribute("link")}"
              class="course-learn-more-link"
              >კურსის დეტალები</a
            >
          </div>
        </div>
      </div>
    `;

    let style = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "tbc-font";
      }
    
      .course-card {
        display: grid;
        grid-template-rows: repeat(2, 1fr);;
        width: 100%;
        border: 1px solid #555555;
        border-radius: 6px;
        overflow: hidden;
      }
    
      .course-image img {
        width: 100%;
        height: 100%;
        object-fit: cover
      }
    
      .course-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    
        padding: 2rem 1rem;
        color: #F4F4F4;
      }
    
      .course-info-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 1rem;
      }
    
      .course-info-status {
        margin-bottom: 1.25rem;
      }
    
      .course-learn-more {
        display: flex;
        gap: 0.5rem;
        cursor: pointer;
      }
      
      .course-learn-more-link {
        color: #00AEF3;
        font-size: 16px;
        font-weight: 500;
        text-decoration: none;
      }
    
      @media (min-width: 1280px) {
        .course-card {
          grid-template-rows: 1fr 1.5fr;
        }
      }
    `;

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("home-courses-card", HomeCoursesCard);
