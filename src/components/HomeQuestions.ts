import { QuestionsConfig } from "../config";

const questionsTemplate = document.createElement("template");
const questionsStyle = document.createElement("style");

class HomeQuestions extends HTMLElement {
  private questionTitles: NodeListOf<HTMLElement>;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(questionsTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(questionsStyle.cloneNode(true));

    this.questionTitles = this.shadowRoot?.querySelectorAll(
      ".question-title"
    ) as NodeListOf<HTMLElement>;
  }

  connectedCallback() {
    this.questionTitles.forEach(
      (questionTitle) =>
        (questionTitle.onclick = () => this.toggleAccordion(questionTitle))
    );
  }

  disconnectedCallback() {
    this.questionTitles.forEach(
      (questionTitle) => (questionTitle.onclick = () => null)
    );
  }

  toggleAccordion(questionTitle: HTMLElement) {
    const answer = questionTitle.nextElementSibling as HTMLElement;
    const height = answer.scrollHeight;

    questionTitle.classList.toggle("answer-opened");

    if (questionTitle.classList.contains("answer-opened")) {
      answer.style.maxHeight = `${height}px`;
    } else {
      answer.style.maxHeight = "0px";
    }
  }
}

questionsTemplate.innerHTML = /* HTML */ `
  <div class="container">
    <div class="header">
      <h2 class="heading">ხშირად დასმული კითხვები</h2>
      <a class="learn-more-desktop">ყველა კითხვა</a>
    </div>
    <div class="accordion">
      ${QuestionsConfig.map(
        (question) => /* HTML */ `<div
          class="question"
          id="question-${question.id}"
        >
          <div class="question-title">
            <h3>${question.title}</h3>
          </div>
          <div class="question-answer">${question.answer}</div>
        </div>`
      ).join("")}
    </div>
    <a class="learn-more-mobile">ყველა კითხვა</a>
  </div>
`;

questionsStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "tbc-font";
  }

  .container {
    padding: 3rem 1.5rem;
    background-color: #161616;
    color: #F4F4F4;
  }

  .header {
    margin-bottom: 2.5rem;
  }

  .heading {
    font-weight: 500;
  }

  .accordion {
    display: flex;
    flex-direction: column;
    gap: 1.375rem;
    
    margin-bottom: 3rem;
  }

  .question {
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #353131;
  }

  .question:has(> .question-title.answer-opened) {
    padding-bottom: 2.5rem;
  }

  .question-title {
    display: flex;
    justify-content: space-between; 
    cursor: pointer;
  }

  .question-title::after {
    content: url(/svgs/IconChevronDown.svg);
    margin: auto 0;
  }

  .answer-opened {
    margin-bottom: 1.5rem;
  }

  .answer-opened::after {
    content: url(/svgs/IconChevronUp.svg);
    margin: auto 0;
  }

  .question-title h3 {
    font-weight: 500;
  }

  .question-answer {
    max-height: 0;
    overflow: hidden;
    transition: 0.3s ease max-height;
    line-height: 2rem;
  }

  .learn-more-mobile, .learn-more-desktop {
    display: block;
    text-align: center;
    color: #00AEF3;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
  }

  .learn-more-desktop {
    display: none;
  }

  @media (min-width: 768px) {
    .container {
      padding: 2.5rem 5rem;
    }

    .header {
      margin-bottom: 3rem;
    }
  }

  @media (min-width: 1024px) {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .learn-more-mobile {
      display: none;
    }

    .learn-more-desktop {
      display: block;
    }
  }

  @media (min-width: 1280px) {
    .container {
      padding: 2.5rem 16.75rem;
    }
  }
`;

window.customElements.define("home-questions", HomeQuestions);
