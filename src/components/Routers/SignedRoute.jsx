import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignedRoute = ({ component: Component, username, ...rest }) => {
  const { currentUser } = useAuth();
  
    return (
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            (currentUser.displayName || username) ? (
              <Component {...props} />
            ) : (
              <Redirect to="/set-username" />
            )
          ) : (
            <Redirect to="/" />
          );
        }}
      ></Route>
    );
  
};
export default SignedRoute;
