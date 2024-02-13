import React from 'react' 
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUserPlus, faCheckToSlot, faRightFromBracket } from '@fortawesome/free-solid-svg-icons' 
import "./components.css"
import { images } from '../../../utils'
 
import { useUserContext } from '../../../contexts/UserContext'



const NavBar = () => {
    const navLogo = images.gym1w
    
    const { LogOut  } = useUserContext()

    return (
        <>
            <div className="slideBar">
                <div>
                    <div className="logo">
                        <img src={navLogo.path} alt={navLogo.alt} /> 
                    </div> 
                    <nav>
                        <ul >
                            <li >
                                <NavLink to="/home" className="nav-link">
                                    <FontAwesomeIcon icon={faHouse} style={{"marginInline":"20px"}}/> Home
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to="/check" className="nav-link">
                                    <FontAwesomeIcon icon={faCheckToSlot} style={{"marginInline":"20px"}}/> Ingreso
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to="/Register" className="nav-link" >
                                    <FontAwesomeIcon icon={faUserPlus} style={{"marginInline":"20px"}}/> Registro
                                </NavLink>
                            </li>
                        </ul>

                    </nav>

                </div>
                <div  style={{paddingBottom:'1rem', width: '240px', display:'flex', justifyContent:'center'}}> 
                    <Button variant="danger" size="sm" style={{width:240}} onClick={() => LogOut()}>
                        <FontAwesomeIcon icon={faRightFromBracket} /> LogOut 
                    </Button> 
                </div>
            </div>
           
        </>
    )
}

export default NavBar

