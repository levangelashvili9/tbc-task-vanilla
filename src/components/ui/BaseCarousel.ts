class BaseCarousel extends HTMLElement {
  private slides: NodeListOf<HTMLElement> | undefined;
  private indicators: NodeListOf<HTMLElement> | undefined;
  private prevSlideButton: HTMLElement | null | undefined;
  private nextSlideButton: HTMLElement | null | undefined;
  private timer: number;
  private interval: any;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();

    this.slides = this.shadowRoot?.querySelectorAll(".carousel-slide");
    this.indicators = this.shadowRoot?.querySelectorAll(".carousel-indicator");
    this.prevSlideButton = this.shadowRoot?.getElementById("chevron-left");
    this.nextSlideButton = this.shadowRoot?.getElementById("chevron-right");
    this.timer = 0;

    // make first slide active
    this.slides![0].classList.add("carousel-slide-active");
  }

  connectedCallback() {
    this.indicators?.forEach(
      (indicator, index) => (indicator.onclick = () => this.changeSlide(index))
    );
    this.prevSlideButton!.onclick = () => this.prevSlide();
    this.nextSlideButton!.onclick = () => this.nextSlide();

    this.interval = setInterval(() => this.autoPlay(), 1000);
  }

  disconnectedCallback() {
    this.indicators?.forEach((indicator) => (indicator.onclick = () => null));
    this.prevSlideButton!.onclick = () => null;
    this.nextSlideButton!.onclick = () => null;

    clearInterval(this.interval);
  }

  changeSlide(id: number) {
    // Remove .slide-active class from all slide elements
    this.slides!.forEach((slide) =>
      slide.classList.remove("carousel-slide-active")
    );

    // Add .slide-active class to active slide only
    this.slides![id].classList.add("carousel-slide-active");

    this.timer = 1;
  }

  prevSlide() {
    // Find the currently active slide
    const activeSlide = [...this.slides!].findIndex((slide) =>
      slide.classList.contains("carousel-slide-active")
    );

    // Calculate the index of the prev slide
    const prevSlideIndex =
      activeSlide > 0 ? activeSlide - 1 : this.slides!.length - 1;

    // Change to the prev slide
    this.changeSlide(prevSlideIndex);
  }

  nextSlide() {
    // Find the currently active slide
    const activeSlide = [...this.slides!].findIndex((slide) =>
      slide.classList.contains("carousel-slide-active")
    );

    // Calculate the index of the next slide
    const nextSlideIndex = (activeSlide + 1) % this.slides!.length;

    // Change to the next slide
    this.changeSlide(nextSlideIndex);
  }

  autoPlay() {
    if (this.timer === 5) {
      this.nextSlide();
    } else {
      this.timer++;
    }
  }

  render() {
    let template = /* HTML */ `
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
        ${Array.from(
          { length: Number(this.getAttribute("numOfSlides") || 3) },
          (_, index) => /* HTML */ `<div class="carousel-slide">
            <slot name="slide-${index}"></slot>
          </div>`
        ).join("")}
      </div>

      <div class="carousel-indicators">
        ${Array.from(
          { length: Number(this.getAttribute("numOfSlides") || 3) },
          (_, index) => /* HTML */ `<div
            class="carousel-indicator"
            id="carousel-indicator-${index}"
          ></div>`
        ).join("")}
      </div>
    `;

    let style = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "tbc-font";
      }
    
      .carousel {
        display: flex;
        margin-bottom: 2.5rem;
        height: 18rem;
        overflow: hidden;
    
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
    
      .carousel-slide {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    
        display: flex;
        justify-content: center;
        aling-items: center;
    
        opacity: 0;
        transition: opacity 1s ease-in-out;
      }
    
      .carousel-slide-active {
        opacity: 1;
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
        .carousel {
          height: 14rem;
        }
      }
    
      @media (min-width: 1024px) {
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
    
      @media (min-width: 1280px) {
        #chevron-left {
          left: 3.5rem;
        }
    
        #chevron-right {
          right: 3.5rem;
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

    this.shadowRoot!.innerHTML = `${template} <style>${style}</style>`;
  }
}

window.customElements.define("base-carousel", BaseCarousel);
