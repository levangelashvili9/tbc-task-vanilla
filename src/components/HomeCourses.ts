import { CoursesConfig } from "../config";

const coursesTemplate = document.createElement("template");
const coursesStyle = document.createElement("style");

class HomeCourses extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(coursesTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(coursesStyle.cloneNode(true));
  }
}

coursesTemplate.innerHTML = /* HTML */ `
  <div class="container">
    <h2 class="heading">სასწავლო კურსები</h2>
    <div class="course-list">
      ${CoursesConfig.map(
        (course) => /* HTML */ `<div
          class="course-card"
          id="course-${course.id}"
        >
          <div class="course-image">
            <img src="${course.image}" alt="ios development course photo" />
          </div>
          <div class="course-info">
            <div>
              <h3>${course.title}</h3>
              <p>${course.status}</p>
            </div>
            <div class="learn-more">
              <img src="/IconArrowRight.svg" alt="arrow right svg" />
              <h4>კურსის დეტალები</h4>
            </div>
          </div>
        </div>`
      ).join("")}
    </div>
  </div>
`;

coursesStyle.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "tbc-font";
    }
    
    .container {
      background-color: #161616;
      padding: 1.5rem 1.5rem 2.5rem 1.5rem;
    }

    .heading {
      font-size: 24px;
      color: #F4F4F4;
      letter-spacing: 1px;
      margin-bottom: 1.5rem;
    }

    .course-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .course-card {
      display: grid;
      grid-template-rows: 1fr 1fr;
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

    .course-info h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .course-info p {
      margin-bottom: 1.25rem;
    }

    .learn-more {
      display: flex;
      gap: 0.5rem;

      color: #00AEF3;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }

    @media (min-width: 546px) {
      .course-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (min-width: 768px) {
      .container {
        padding: 2.5rem 5rem;
      }

      .heading {
        margin-bottom: 2.5rem;
      }
    }

    @media (min-width: 1024px) {
      .heading {
        margin-bottom: 4rem;
      }
      
      .course-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    @media (min-width: 1280px) {
      .container {
        padding: 1.5rem 16.75rem 2.5rem 16.75rem;
      }

      .course-card {
        grid-template-rows: 1fr 1.5fr;
      }
    }
`;

window.customElements.define("home-courses", HomeCourses);
