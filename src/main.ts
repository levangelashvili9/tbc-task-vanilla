import "./style.css";
import "./components";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* HTML */ `
  <the-navbar></the-navbar>
  <main>
    <home-hero></home-hero>
    <home-courses></home-courses>
    <home-partners></home-partners>
    <home-faq></home-faq>
  </main>
  <the-footer></the-footer>
`;
