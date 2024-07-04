
import PropTypes from 'prop-types';
import "./navbar.css";

function Navbar(props) {
  return (
    <nav>
      <div className="logo">{props.title}</div>
      <ul className="nav-links">
        <li><a className='hover:font-bold cursor-pointer transition-all '>Home</a></li>
        <li><a className='hover:font-bold transition-all  ' href="#">Your Tasks</a></li>
       
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
  };
  


export default Navbar;
