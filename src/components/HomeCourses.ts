import { CoursesConfig } from "../config";

let homeCoursesTemplate = document.createElement("template");
let homeCoursesStyle = document.createElement("style");

class HomeCourses extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(homeCoursesTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(homeCoursesStyle.cloneNode(true));
  }
}

homeCoursesTemplate.innerHTML = /* HTML */ `
  <section class="courses-container">
    <h2 class="courses-heading">სასწავლო კურსები</h2>

    <div class="courses-list">
      ${CoursesConfig.map(
        (course) => /* HTML */ `<article
          class="course-card"
          id="course-${course.id}"
        >
          <div class="course-image">
            <img src="${course.image}" alt="${course.title} course photo" />
          </div>
          <div class="course-info">
            <div>
              <h3>${course.title}</h3>
              <p>${course.status}</p>
            </div>
            <div class="course-learn-more">
              <img src="/svgs/IconArrowRight.svg" alt="arrow right svg" />
              <a href="${course.link}" class="course-learn-more-link"
                >კურსის დეტალები</a
              >
            </div>
          </div>
        </article>`
      ).join("")}
    </div>
  </section>
`;

homeCoursesStyle.textContent = `
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

  .course-info h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .course-info p {
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
      
    .courses-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);;
    }
  }

  @media (min-width: 1280px) {
    .courses-container {
      padding: 1.5rem 16.75rem 2.5rem 16.75rem;
    }

    .course-card {
      grid-template-rows: 1fr 1.5fr;
    }
  }
`;

window.customElements.define("home-courses", HomeCourses);
