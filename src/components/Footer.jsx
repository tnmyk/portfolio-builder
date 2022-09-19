import { Link } from "react-router-dom";

const Footer = () => {
    const year =new Date().getFullYear()
    return (
      <footer>
        <span>Copyright &copy; {year}</span>
        <span>support@portfolio.com</span>
        <Link to='/term-of-service' >Made by tnmyk</Link>
      </footer>
    );
}
 
export default Footer;