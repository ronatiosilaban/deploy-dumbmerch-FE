import logo from './DumbMerch.png';
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import cssModules from "../style/navbar.module.css";


function NavbarComponent() {
    const [_, dispatch] = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        });
        navigate("/login");
    }
    return (
        <div>
            <Navbar className={cssModules.navdark}>
                <Container>
                    <Navbar.Brand href="/admin-complain">
                        <img
                            alt=""
                            src={logo}
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Nav className="justify-content-end">
                        <NavLink to="/admin-complain" activeClassName="active--link" className={cssModules.menu}>Complain</NavLink >
                        <NavLink to="/category" activeClassName="active--link" className={cssModules.menu}>Category</NavLink >
                        <NavLink to="/product" activeClassName="active--link" className={cssModules.menu}>Product</NavLink >
                        <p onClick={handleLogout} className={cssModules.menu}>Logout</p>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}


export default NavbarComponent