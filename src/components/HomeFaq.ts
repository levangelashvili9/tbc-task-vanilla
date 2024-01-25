import { QuestionsConfig } from "../config";

let homeFaqTemplate = document.createElement("template");
let homeFaqStyle = document.createElement("style");

class HomeFaq extends HTMLElement {
  private questionTitles: NodeListOf<HTMLElement> | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(homeFaqTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(homeFaqStyle.cloneNode(true));

    this.questionTitles = this.shadowRoot?.querySelectorAll(
      ".faq-question-title"
    );
  }

  connectedCallback() {
    this.questionTitles!.forEach(
      (title, index) => (title.onclick = () => this.toggleAccordion(index))
    );
  }

  disconnectedCallback() {
    this.questionTitles!.forEach((title) => (title.onclick = () => null));
  }

  toggleAccordion(titleId: number) {
    this.questionTitles!.forEach((title, index) => {
      // get height of answer element
      const answer = title.nextElementSibling as HTMLElement;
      const height = answer.scrollHeight;

      // remove class on every other element and toggle that class on clicked element
      if (titleId === index) {
        title.classList.toggle("faq-question-active");
      } else {
        title.classList.remove("faq-question-active");
      }

      // check if element has active class, if true, give it necessary height, if false, hide it
      if (title.classList.contains("faq-question-active")) {
        answer.style.maxHeight = `${height}px`;
      } else {
        answer.style.maxHeight = "0px";
      }
    });
  }
}

homeFaqTemplate.innerHTML = /* HTML */ `
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
      ${QuestionsConfig.map(
        (question) => /* HTML */ `<div
          class="faq-question"
          id="question-${question.id}"
        >
          <div class="faq-question-title">
            <h3>${question.title}</h3>
          </div>
          <div class="faq-question-answer">${question.answer}</div>
        </div>`
      ).join("")}
    </div>

    <a href="https://www.tbcacademy.ge/usaid-faq" class="faq-learn-more-mobile"
      >ყველა კითხვა</a
    >
  </section>
`;

homeFaqStyle.textContent = `
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

  .faq-question {
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #353131;
  }

  .faq-question:has(> .faq-question-title.faq-question-active) {
    padding-bottom: 2.5rem;
  }

  .faq-question-title {
    display: flex;
    justify-content: space-between; 
    cursor: pointer;
  }

  .faq-question-title::after {
    content: url(/svgs/IconChevronDown.svg);
    margin: auto 0;
  }

  .faq-question-active {
    margin-bottom: 1.5rem;
  }

  .faq-question-active::after {
    content: url(/svgs/IconChevronUp.svg);
    margin: auto 0;
  }

  .faq-question-title h3 {
    font-weight: 500;
  }

  .faq-question-answer {
    max-height: 0;
    overflow: hidden;
    transition: 0.3s ease max-height;
    line-height: 2rem;
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

window.customElements.define("home-faq", HomeFaq);
