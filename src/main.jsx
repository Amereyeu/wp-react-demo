// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React, { Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Loader from "./components/Loader";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }>
      <App />
    </Suspense>
  </StrictMode>
);

