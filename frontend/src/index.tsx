import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className={ "vh-100" }>
      <div className={ "container py-5 h-100" }>
        <div className={ "row d-flex justify-content-center align-items-center h-100" }>
          <div className={ "col col-lg-8 col-xl-6" }>
            <div className={ "card rounded-3" }>
              <div className={ "card-body m-3 p-0" }>
                <App />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.StrictMode>
);
