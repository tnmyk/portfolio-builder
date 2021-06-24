import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import Error from "./Error";
import CreateAccount from "./CreateAccount";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import SignIn from "./SignIn";
import { AuthProvider } from "../context/AuthContext";
import SignedRoute from "./SignedRoute";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Nav />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <SignedRoute exact path="/create-account" component={CreateAccount} />
            <SignedRoute exact path="/sign-in" component={SignIn} />
            <Route path="*" component={Error} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
