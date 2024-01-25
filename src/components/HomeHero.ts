const homeHeroTemplate = document.createElement("template");
const homeHeroStyle = document.createElement("style");

class HomeHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(homeHeroTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(homeHeroStyle.cloneNode(true));
  }
}

homeHeroTemplate.innerHTML = /* HTML */ `
  <section class="hero-container">
    <div class="hero-image">
      <header>
        <h1>TBC x USAID</h1>
        <h2>ᲢᲔᲥᲜᲝᲚᲝᲒᲘᲣᲠᲘ ᲒᲐᲜᲐᲗᲚᲔᲑᲘᲡᲗᲕᲘᲡ</h2>
      </header>
    </div>
    <div class="hero-info">
      <p>
        „ TBC x USAID - ტექნოლოგიური განათლებისთვის “ პროგრამა საინფორმაციო
        ტექნოლოგიებით დაინტერესებულ ადამიანებს გთავაზობთ სრულად დაფინანსებულ
        ონლაინ საგანმანათლებლო პრაქტიკულ კურსებს სხვადასხვა ICT მიმართულებით.
        წარმატებულ კურსდამთავრებულებს ეძლევათ შესაძლებლობა დასაქმდნენ თიბისისა
        და მის პარტნიორ კომპანიებში.
      </p>
      <a href="https://www.tbcacademy.ge/usaid-about">გაიგე მეტი</a>
    </div>
  </section>
`;

homeHeroStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "tbc-font";
  }

  .hero-container {
    margin-top: 5.25rem;
  }

  .hero-image {
    background-image: url("/images/hero-image.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    height: 13.5rem;

    display: flex;
    align-items: center;
    padding-left: 1.5rem;
  }

  header {
    color: white;
    line-height: 2.5rem;
  }

  header h1, header h2 {
    font-family: tbcBOLD;
  }

  .hero-info {
    background-color: #2B2B2B;
    padding: 2rem 1.5rem 2.5rem 1.5rem;
  }

  .hero-info p {
    color: #F4F4F4;
    line-height: 1.6rem;

    margin-bottom: 3rem;
  }

  .hero-info a {
    font-size: 16px;
    font-weight: bold;
    color: #00AEF3;
    text-decoration: none;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .hero-image {
      padding-left: 5rem;
    }
      
    .hero-info {
      background-color: #2B2B2B;
      padding: 2rem 5rem 2.5rem 5rem;
    }
  }

  @media (min-width: 1024px) {
    .hero-info {
      padding: 3rem 5rem;
    }

    .hero-info p {
      font-size: 22px;
      line-height: normal;
    }

    .hero-info a {
      font-size: 20px;
    }
  }

  @media (min-width: 1280px) {
    .hero-image {
      height: 21.75rem;
      padding-left: 16.75rem;
    }

    header h1 {
      font-size: 42px;
      margin-bottom: 1.75rem;
    }

    header h2 {
      font-size: 34px;
    }

    .hero-info {
      padding: 4rem 16.75rem;
    }

    .hero-info p {
      font-size: 28px;
      line-height: 2.8rem;
    }

    .hero-info a {
      font-size: 22px;
    }
  }
`;

window.customElements.define("home-hero", HomeHero);
