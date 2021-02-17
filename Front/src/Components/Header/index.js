import { Navbar, Nav, NavLink, NavbarBrand } from 'reactstrap';
import './style.css';

const Header = () => {
    return <Navbar className="mainHeader" expand="md">
        <NavbarBrand href="/">TODO LIST</NavbarBrand>
        <Nav>
            <NavLink href="/Signup">Sign Up</NavLink>
            <NavLink href="/">Login</NavLink>
        </Nav>
    </Navbar>;
}

export default Header;