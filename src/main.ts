import "./style.css";
import "./components";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <navigation-bar></navigation-bar>
    <home-hero></home-hero>
    <home-courses></home-courses>
  </main>
`;
