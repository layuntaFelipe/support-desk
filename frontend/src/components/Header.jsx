import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import logoDesk from '../assets/logoDesk.png';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <header className='header'>
      <div className="logo" style={{position: 'relative'}}>
        <Link to='/'><img src={logoDesk} alt="logo" style={{width: '1.8rem', position: 'relative', bottom: '-6px'}} /> Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}><FaSignOutAlt/> Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login"><FaSignInAlt/> Login</Link>
            </li>
            <li>
              <Link to="/register"><FaUser/> Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header