import "./style.css";
import "./components";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <the-navbar></the-navbar>
    <home-hero></home-hero>
    <home-courses></home-courses>
    <home-partners></home-partners>
    <home-faq></home-faq>
    <the-footer></the-footer>
  </main>
`;
