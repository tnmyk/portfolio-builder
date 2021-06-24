import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useHistory,Link } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signIn } = useAuth();
    const history = useHistory()

  async function signInHandler() {
      try{
          setErrorMsg('')
          setLoading(true);
          await signIn(email,password);
          history.push('/')
      }
      catch(err){
          setErrorMsg(err.message)
      }
      setLoading(false)
  }
  async function authGoogle () {
    try{
        await signInWithGoogle();
        history.push('/')
    } catch(err){
        console.log(err)
    }
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="page">
      <h1 className="sub-heading">Sign In</h1>
      <div className="auth-container">
        <div className="auth-email-container">
          <span className="authErrorText">{errorMsg}</span>
          <input
            type="email"
            name="email"
            className="email"
            placeholder="Email"
            onChange={changeEmail}
            value={email}
            required
          />
          <input
            type="password"
            name="password"
            className="password"
            placeholder="Password"
            onChange={changePassword}
            value={password}
            required
            minLength="6"
          />
          <button onClick={signInHandler}>Sign In</button>
          <Link to="/create-account" className="auth-already">
            Create an Account
          </Link>
        </div>
        <div className="auth-other-container">
          <button
            disabled={loading}
            className="auth-google"
            onClick={authGoogle}
          >
            <FcGoogle className="auth-other-icon" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
