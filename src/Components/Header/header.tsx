import { Link } from "react-router-dom"
import {getUserData, removeUserData} from "../../Services/userData"
import { useState } from "react"

const Header: React.FC = () => {
    const [userData, setUserData] = useState(getUserData());
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
                        : 
                        <>
                            <li className="nav-item">
                                <Link to={'/upload'} className="nav-link">Upload</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick = {()=>{
                                    setUserData(removeUserData());
                                }}>Logout</a>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    </>
}

export default Header;