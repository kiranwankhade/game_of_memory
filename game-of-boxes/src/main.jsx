import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
          <App />
        </GoogleOAuthProvider>
       
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
