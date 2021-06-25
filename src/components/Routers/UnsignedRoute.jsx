import {Redirect, Route} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const SignedRoute = ({component:Component,...rest}) => {
    const {currentUser} = useAuth()
    return ( <Route
        {...rest}
        render={props=>{
           return !currentUser ? <Component {...props} /> : <Redirect to='/'/>
        }}
    ></Route> );
}
 
export default SignedRoute;