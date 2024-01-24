import "./style.css";
import "./components";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <the-navbar></the-navbar>
    <home-hero></home-hero>
    <home-courses></home-courses>
    <home-partners></home-partners>
    <home-questions></home-questions>
    <the-footer></the-footer>
  </main>
`;
