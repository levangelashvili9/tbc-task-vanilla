const heroTemplate = document.createElement("template");
const heroStyle = document.createElement("style");

class HomeHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(heroTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(heroStyle.cloneNode(true));
  }
}

heroTemplate.innerHTML = /* HTML */ `
  <div class="container">
    <div class="hero-image">
      <div class="heading">
        <h1>TBC x USAID</h1>
        <h2>ᲢᲔᲥᲜᲝᲚᲝᲒᲘᲣᲠᲘ ᲒᲐᲜᲐᲗᲚᲔᲑᲘᲡᲗᲕᲘᲡ</h2>
      </div>
    </div>
    <div class="hero-info">
      <p>
        „ TBC x USAID - ტექნოლოგიური განათლებისთვის “ პროგრამა საინფორმაციო
        ტექნოლოგიებით დაინტერესებულ ადამიანებს გთავაზობთ სრულად დაფინანსებულ
        ონლაინ საგანმანათლებლო პრაქტიკულ კურსებს სხვადასხვა ICT მიმართულებით.
        წარმატებულ კურსდამთავრებულებს ეძლევათ შესაძლებლობა დასაქმდნენ თიბისისა
        და მის პარტნიორ კომპანიებში.
      </p>
      <h3>გაიგე მეტი</h3>
    </div>
  </div>
`;

heroStyle.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "tbc-font";
  }

  .container {
    margin-top: 5.25rem;
  }

  .hero-image {
    background-image: url("/images/hero-image.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 13.5rem;

    display: flex;
    align-items: center;
    padding-left: 1.5rem;
  }

  .heading {
    color: white;
    line-height: 2.5rem;
  }

  .heading h1 {
    margin-bottom: 5px;
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

  .hero-info h3 {
    font-size: 16px;
    color: #00AEF3;
    cursor-pointer;
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

    .hero-info h3 {
      font-size: 20px;
    }
  }

  @media (min-width: 1280px) {
    .hero-image {
      padding-left: 16.75rem;
    }

    .hero-info {
      padding: 4rem 16.75rem;
    }

    .hero-info p {
      font-size: 28px;
    }

    .hero-info h3 {
      font-size: 22px;
    }
  }
`;

window.customElements.define("home-hero", HomeHero);
