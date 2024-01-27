class HomeFaqQuestion extends HTMLElement {
  private question: HTMLElement | null | undefined;
  private questionTitle: HTMLElement | null | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();

    this.id = `question-${this.getAttribute("id")}`;
    this.question = this.shadowRoot?.querySelector(".faq-question");
    this.questionTitle = this.shadowRoot?.querySelector(".faq-question-title");
  }

  connectedCallback() {
    this.question!.onclick = () => this.toggleAccordion();
  }

  disconnectedCallback() {
    this.question!.onclick = () => null;
  }

  toggleAccordion() {
    // find sibling questions
    const parent = this.parentElement;
    const siblingQuestions = parent?.querySelectorAll("home-faq-question");

    // deactivate all other sibling questions
    siblingQuestions?.forEach((question) => {
      const questionContainer = question.shadowRoot?.querySelector(
        ".faq-question"
      ) as HTMLElement;
      const siblingTitle = questionContainer.querySelector(
        ".faq-question-title"
      ) as HTMLElement;
      const siblingAnswer = questionContainer.querySelector(
        ".faq-question-answer"
      ) as HTMLElement;

      if (siblingTitle !== this.questionTitle) {
        siblingTitle.classList.remove("faq-question-active");
        siblingAnswer.style.maxHeight = "0px";
      }
    });

    // toggle current question
    this.questionTitle!.classList.toggle("faq-question-active");

    // get height of answer element
    const answer = this.questionTitle!.nextElementSibling as HTMLElement;
    const height = answer.scrollHeight;

    // check if element has active class, if true, give it necessary height, if false, hide it
    if (this.questionTitle!.classList.contains("faq-question-active")) {
      answer.style.maxHeight = `${height}px`;
    } else {
      answer.style.maxHeight = "0px";
    }
  }

  render() {
    let template = /* HTML */ `
      <div class="faq-question">
        <div class="faq-question-title">
          <h3>${this.getAttribute("title")}</h3>
        </div>
        <div class="faq-question-answer">${this.getAttribute("answer")}</div>
      </div>
    `;

    let style = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "tbc-font";
      }
      
      .faq-question {
        padding-bottom: 1.25rem;
        border-bottom: 1px solid #353131;
        cursor: pointer;
      }
        
      .faq-question:has(> .faq-question-title.faq-question-active) {
        padding-bottom: 2.5rem;
      }
        
      .faq-question-title {
        display: flex;
        justify-content: space-between; 
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
    `;

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("home-faq-question", HomeFaqQuestion);
