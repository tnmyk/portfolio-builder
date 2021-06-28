import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useHistory,Link } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
    const history = useHistory();


  async function signUpEmail() {
    if (password !== cpassword) {
      return setErrorMsg("Password and Confirm-password are not same");
    }
    try {
      setErrorMsg("");
      setLoading(true);
      await signUp(email, password);
      history.push("/");
    } catch (e) {
      setErrorMsg(e.message);
    }
    setLoading(false);
  }


  async function authGoogle() {
    try {
      await signInWithGoogle();
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeCpassword = (e) => {
    setCpassword(e.target.value);
  };
  return (
    <div className="page">
      <h1 className="sub-heading">Create Your Free Account Now</h1>
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
          <input
            type="password"
            name="cpassword"
            className="cpassword"
            placeholder="Confirm Password"
            onChange={changeCpassword}
            value={cpassword}
            required
          />
          <button onClick={signUpEmail}>Create Account</button>
          <Link to='/sign-in' className='auth-already'>Already have an account? Sign in.</Link>
        </div>
        <div className="auth-other-container">
          <button
            disabled={loading}
            className="auth-google"
            onClick={authGoogle}
          >
            {" "}
            <FcGoogle className="auth-other-icon" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};;

export default CreateAccount;
