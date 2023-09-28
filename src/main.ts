import "./style.css";
import { setupCounter } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    todo list
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
