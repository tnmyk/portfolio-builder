import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import Error from "./Error";
import CreateAccount from "./CreateAccount";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import SignIn from "./SignIn";
import { AuthProvider } from "../context/AuthContext";
import UnsignedRoute from "./Routers/UnsignedRoute";
import SignedRoute from "./Routers/SignedRoute";
import Dashboard from './Dashboard'
import CreatePortfolio from "./CreatePortfolio";
import { useState } from "react";
import PersonalSite from "./PersonalSite";
import SetUsername from "./SetUsername";
import EditPortfolio from "./EditPortfolio";
import Settings from "./Settings";
const App = () => {
  const [personal,setPersonal] =useState(false)
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        {!personal && <Nav />}
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <UnsignedRoute
              exact
              path="/create-account"
              component={CreateAccount}
            />
            <UnsignedRoute exact path="/sign-in" component={SignIn} />
            <SignedRoute exact path="/dashboard" component={Dashboard} />
            <SignedRoute
              exact
              path="/create-portfolio"
              component={CreatePortfolio}
            />
            <SignedRoute
              exact
              path="/edit-portfolio"
              component={EditPortfolio}
            />
            <SignedRoute
              exact
              path="/settings"
              component={Settings}
            />
            <SignedRoute exact path="/set-username" component={SetUsername} />
            <Route exact path="/portfolio/:username">
              <PersonalSite setPersonal={setPersonal} />
            </Route>
            <Route path="*" component={Error} />
          </Switch>
        </div>
        {!personal && <Footer />}
      </Router>
    </AuthProvider>
  );
};

export default App;
