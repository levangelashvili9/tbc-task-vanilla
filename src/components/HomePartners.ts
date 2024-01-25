const homePartnersTemplate = document.createElement("template");
const homePartnersStyle = document.createElement("style");

class HomePartners extends HTMLElement {
  private slides: NodeListOf<HTMLElement>;
  private indicators: NodeListOf<HTMLElement>;
  private prevSlideButton: HTMLElement;
  private nextSlideButton: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(homePartnersTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(homePartnersStyle.cloneNode(true));

    this.slides = this.shadowRoot?.querySelectorAll(
      ".slide"
    ) as NodeListOf<HTMLElement>;

    this.indicators = this.shadowRoot?.querySelectorAll(
      ".carousel-indicator"
    ) as NodeListOf<HTMLElement>;

    this.prevSlideButton = this.shadowRoot?.getElementById(
      "chevron-left"
    ) as HTMLElement;

    this.nextSlideButton = this.shadowRoot?.getElementById(
      "chevron-right"
    ) as HTMLElement;
  }

  connectedCallback() {
    this.indicators?.forEach(
      (indicator, index) => (indicator.onclick = () => this.changeSlide(index))
    );

    this.prevSlideButton.onclick = () => this.prevSlide();
    this.nextSlideButton.onclick = () => this.nextSlide();
  }

  disconnectedCallback() {
    this.indicators?.forEach((indicator) => (indicator.onclick = () => null));

    this.prevSlideButton.onclick = () => null;
    this.nextSlideButton.onclick = () => null;
  }

  changeSlide(id: number) {
    // Remove .slide-active class from all slide elements
    this.slides.forEach((slide) => slide.classList.remove("slide-active"));

    // Add .slide-active class to active slide only
    this.slides[id].classList.add("slide-active");
  }

  prevSlide() {
    // Find the currently active slide
    const activeSlide = [...this.slides].findIndex((slide) =>
      slide.classList.contains("slide-active")
    );

    // Calculate the index of the prev slide
    const prevSlideIndex =
      activeSlide > 0 ? activeSlide - 1 : this.slides.length - 1;

    // Change to the prev slide
    this.changeSlide(prevSlideIndex);
  }

  nextSlide() {
    // Find the currently active slide
    const activeSlide = [...this.slides].findIndex((slide) =>
      slide.classList.contains("slide-active")
    );

    // Calculate the index of the next slide
    const nextSlideIndex = (activeSlide + 1) % this.slides.length;

    // Change to the next slide
    this.changeSlide(nextSlideIndex);
  }
}

homePartnersTemplate.innerHTML = /* HTML */ `
  <section class="container">
    <h2 class="heading">პროექტის პარტნიორები</h2>
    <div class="carousel">
      <img
        src="/svgs/IconChevronLeft.svg"
        alt="chevron pointing left"
        id="chevron-left"
      />
      <img
        src="/svgs/IconChevronRight.svg"
        alt="chevron pointing right"
        id="chevron-right"
      />
      <div class="slide slide-active" id="slide-1">
        <div class="image-container">
          <img src="/images/usaid.png" />
        </div>
        <div class="image-container">
          <img src="/images/space.png" />
        </div>
        <div class="image-container">
          <img src="/images/t-net.png" />
        </div>
      </div>
      <div class="slide" id="slide-2">
        <div class="image-container">
          <img src="/images/tegeta.png" />
        </div>
        <div class="image-container">
          <img src="/images/spectre.png" />
        </div>
        <div class="image-container">
          <img src="/images/tbc-leasing.png" />
        </div>
      </div>
      <div class="slide" id="slide-3">
        <div class="image-container">
          <img src="/images/ufc.png" />
        </div>
      </div>
    </div>
    <div class="carousel-indicators">
      <div class="carousel-indicator"></div>
      <div class="carousel-indicator"></div>
      <div class="carousel-indicator"></div>
    </div>
  </section>
`;

homePartnersStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "tbc-font";
  }
      
  .container {
    background-color: #2B2B2B;
    padding: 1.5rem 0;
  }

  .heading {
    margin-left: 1.5rem;
    margin-bottom: 4rem;
    color: #F4F4F4;
    font-weight: 500;
  }

  .carousel {
    display: flex;
    margin-bottom: 2.5rem;
    height: 18rem;

    position: relative;
  }
      
  #chevron-left, #chevron-right {
    display: none;
    width: 18px;
    height: 35px;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
          
    z-index: 1;
    cursor: pointer;
  }

  #chevron-left:hover, #chevron-right:hover {
    opacity: 0.7;
  }

  #chevron-left {
    left: 0;
  }

  #chevron-right {
    right: 0;
  }

  .slide {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
          
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .slide-active {
    opacity: 1;
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
      
  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .carousel-indicator {
    width: 6px;
    height: 6px;
    background-color: #E8E6E6;
    border-radius: 50%;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .container {
      padding: 2.5rem 0;
    }
          
    .heading {
      margin-left: 5rem;
      margin-bottom: 3rem;
    }

    .carousel {
      height: 14rem;
    }

    .slide {
      flex-direction: row;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding-bottom: 5rem;
    }

    .heading {
      margin-bottom: 6rem;
    }

    .carousel {
      height: 5rem;
    }

    #chevron-left, #chevron-right {
      display: block;
    }

    #chevron-left {
      left: 2rem;
    }

    #chevron-right {
      right: 2rem;
    }
  }

  @media (min-width: 1200px) {
    .slide {
      gap: 8rem;
    }

    .image-container img {
      width: 15rem;
    }
  }

  @media (min-width: 1280px) {
    .heading {
      margin-left: 16.75rem;
    }
  }

  @media (min-width: 1440px) {
    #chevron-left {
      left: 6rem;
    }

    #chevron-right {
      right: 6rem;
    }
  }
`;

window.customElements.define("home-partners", HomePartners);
