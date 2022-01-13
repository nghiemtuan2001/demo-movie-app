import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UiContextProvider } from "./context/ui-context";

ReactDOM.render(
  <UiContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UiContextProvider>,
  document.getElementById("root")
);
