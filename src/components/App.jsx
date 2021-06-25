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
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Nav />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <UnsignedRoute
              exact
              path="/create-account"
              component={CreateAccount}
            />
            <UnsignedRoute exact path="/sign-in" component={SignIn} />
            <SignedRoute exact path='/dashboard' component={Dashboard}/>
            <Route path="*" component={Error} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
