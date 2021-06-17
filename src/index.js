import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history'

import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "../firebase-config";
import App from "./routes/App";

const history = new createBrowserHistory()

ReactDOM.hydrate(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={"Conectado la app..."}>
      <Router history={history}>
        <App />
      </Router>
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById("app")
);
