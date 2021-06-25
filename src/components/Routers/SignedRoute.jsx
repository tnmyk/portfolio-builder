import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function UnsignedRouter({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        currentUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
