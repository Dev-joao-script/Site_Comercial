import { Link } from 'react-router-dom'
import style from './Navbar.css'

export const Navbar = () => {
  return (
    <nav className='nav-all' style={style}>
        <Link to={"/"}>Home</Link>
        <Link to={"/About"}>About</Link>
    </nav>
  )
}
