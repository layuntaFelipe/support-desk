import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {FaUser} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const {name, email, password, password2} = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError , isSuccess, message} = useSelector(state => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    // Redireect when logged in
    if(isSuccess || user) {
      navigate('/');
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  } 

  const onSubmit = (e) => {
    e.preventDefault();

    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form>
          <div className="form-group">
            <input type="text" className="form-control" id='name' name='name' value={name} onChange={onChange} placeholder="Enter your name" required />
            <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder="Enter your email" required />
            <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder="Enter your password" required />
            <input type="password" className="form-control" id='password2' name='password2' value={password2} onChange={onChange} placeholder="Confirm password" required />
          </div>
          <div className="form-group">
            <button className="btn btn-block" onClick={onSubmit}>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register