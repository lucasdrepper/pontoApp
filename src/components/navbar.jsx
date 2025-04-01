import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import logo from '../assets/Logo.png';
import 'boxicons';

function Navbar() {
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="Navbar">
      <div className='container'>
        <Link to="/"><img src={logo} alt="logo" className='logo'/></Link>
        <li><Link to="/controlpoint">Gestão de Ponto <box-icon name='chevron-right'></box-icon></Link></li>
        <li><Link to="/reports">Relatórios <box-icon name='chevron-right'></box-icon></Link></li>
        <li><Link to="/registrations">Cadastros <box-icon name='chevron-right'></box-icon></Link></li>
        <div className="user">
            <button onClick={handleLogout} className="logout-btn">Sair</button>
            <box-icon type='solid' size='36px' name='user-circle'></box-icon>
        </div>
      </div>
    </div>
  );
}

export default Navbar;