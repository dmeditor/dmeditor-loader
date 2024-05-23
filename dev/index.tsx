import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { RemoteLoaderPlugin } from "../src/index";

const renderApp = () => {
  const $el = document.getElementById("dmeditor");
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  createRoot($el!).render(app);
};

renderApp();

// export default renderApp;
