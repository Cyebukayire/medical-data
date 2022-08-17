import { useFormik } from 'formik'
import 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../../styles/common.css'
import * as Yup from "yup";
import { login } from '../../../services/auth';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
const [requestError, setRequestError] = useState(false);
const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  }

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  })


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema
  });
  
  const {handleChange, values, errors, touched, getFieldProps, isValid} = formik
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestError(false);
    const response = await login(values);
    if(!response?.success) return setRequestError(response?.message || "Something went wrong");
    localStorage.setItem('token', response.data.token);
    toast.success("Logged in successfully");
    navigate('/votes');
  }
  const errorInputStyle = {
    border: '1px solid red'
  }

  return (
    <div className="container">
      <Toaster/>
      <div className='form-container'>
        <form>
          {requestError && <div className='error-message'>{requestError}</div>}
          <h1>Login </h1>
          <input name='email' type='email' placeholder="email" 
            {...getFieldProps('email')}
            style={errors.email && touched.email ? errorInputStyle : {}}
          />
          { touched.email && errors.email && <label>{errors.email}</label>}
          <input name='password' type='password' placeholder="password" 
          {...getFieldProps('password')}
          style={errors.password && touched.password ? errorInputStyle : {}}
          />
          { touched.password && errors.password && <label>{errors.password}</label>}
          <button
          type='submit'
          disabled={!isValid || Object.values(touched).every(e => e === '')}
          style={!isValid || Object.values(touched).every(e => e === '') ? { backgroundColor: '#ccc'} : {}}
          onClick={handleSubmit}
          >LOGIN</button>
        </form>

        <Link to='/signup'>
              <p style={{marginTop: '2em'}}>Have no account ? <span>Register</span></p>
          </Link>
      </div>
    </div>
  )
}

export default Login
