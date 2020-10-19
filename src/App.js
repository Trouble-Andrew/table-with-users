import React from "react";
import "bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";
import { FirebaseState } from "./context/firebase/FirebaseState";

function App() {
  return (
    <FirebaseState>
      <BrowserRouter>
        <Navbar />
        <div className="container pt-4">
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={"/about"} exact component={About} />
          </Switch>
        </div>
        <Modal />
      </BrowserRouter>
    </FirebaseState>
  );
}

export default App;
