import { Link } from "react-router-dom"
import {getUserData, removeUserData} from "../../Services/userData"
import { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"

export type User = {
    sub: string
    unique_name: string
}

const Header: React.FC = () => {
    const [userData, setUserData] = useState(getUserData());
    let user = userData?.user as User; 
    return <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
            <div className="container">
                <Link to={'/'} className="navbar-brand">Image Processing</Link>
                <ul className="navbar-nav">
                    { userData == null ? 
                        <>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/register'} className="nav-link">Register</Link>
                            </li>
                        </> 
                        : (
                        <>
                        <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic"
                                style={{ backgroundColor: 'transparent', border: 'none' }}>
                                    <i className="fas fa-user"></i> {user.unique_name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={'/upload'}>Upload</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={'/logout'} onClick={() => {
                                        removeUserData();
                                        setUserData(null);
                                    }}>Logout</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    </>
}

export default Header;
