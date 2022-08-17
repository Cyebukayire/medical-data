import 'react'
import { Link } from 'react-router-dom'
import '../../../styles/common.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { register } from '../../../services/auth'
import toast, { Toaster } from 'react-hot-toast'

const SignUp = () => {
const [ requestError, setRequestError ] = useState(false);
const initialValues = {
  username: '',
  password: '',
  firstname:"",
  lastname:"",
  phone:"",
  birthDay:"",
  // gender:"",
  // role:"",
}

const schema = Yup.object().shape({
  username: Yup.string().required("Enter valid username").max(20).min(2),
  password: Yup.string().required("Enter valid password").max(25).min(5),
  firstname: Yup.string().required("Enter valid name").max(25).min(5),
  lastname: Yup.string().required("Enter valid name").max(25).min(5),
  phone: Yup.number().required("Enter valid phone number"),
  birthDay: Yup.date().required("Enter valid birth day")
})

const formik = useFormik({
  initialValues,
  validationSchema: schema
})

const { handleChange, values, errors, touched, getFieldProps, isValid  } = formik
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(values)
  // const response = await register(values);
  // if(!response?.success) {
  //   return setRequestError(response.message || "Something went wrong");
  // }
  // toast.success("Account created successfully");
}

const errorInputStyle = {
  border: '1px solid red'
}
  return (
    <div className="container">
      <div className='form-container'>
        <form>
          <Toaster/>
          {requestError && <div className='error-message'>{requestError}</div>}
          <h1>Sign up </h1>
          {/* Username */}
          <input name='username' type="text" placeholder="Username"
          {...getFieldProps('username')}
          style={errors.username && touched.username ? errorInputStyle : {}}
          />
          { touched.username && errors.username && <label>{errors.username}</label>}

          {/* Password */}
          <input name='password' type="password" placeholder="password" 
          {...getFieldProps('password')}
          style={ errors.password && touched.password ? errorInputStyle : {}}
          />
          { touched.password && errors.password && <label>{errors.password}</label>}
          
          {/* Names */}
          <input name='firstname' type="text" placeholder="First Name" 
          {...getFieldProps('firstname')}
          style={errors.firstname && touched.firstname ? errorInputStyle: {}}
          />
          { touched.firstname && errors.firstname && <label>{errors.firstname}</label>}

          <input name='lastname' type="text" placeholder="Last Name" 
          {...getFieldProps('lastname')}
          style={errors.lastname && touched.lastname ? errorInputStyle: {}}
          />
          { touched.lastname && errors.lastname && <label>{errors.lastname}</label>}

          {/* Phone Number */}
          <input name='phone' type="text" placeholder="Phone Number" 
          {...getFieldProps('phone')}
          style={errors.phone && touched.phone ? errorInputStyle: {}}
          />
          { touched.phone && errors.phone && <label>{errors.phone}</label>}

          {/* Birth Day */}
          <input name='birthDay' type="date" required
          {...getFieldProps('birthDay')}
          style={errors.birthDay && touched.birthDay ? errorInputStyle: {}}
          />
          { touched.birthDay && errors.birthDay&& <label>{errors.birthDay}</label>}
          
          <button 
          type='submit' 
          disabled={!isValid || Object.values(touched).every(e => e === '')}
          style={ !isValid || Object.values(touched).every(e => e === '') ? {backgroundColor: '#ccc'} : {}}
          onClick = {handleSubmit}
          >Signup</button>

          <Link to='/'>
              <p style={{marginTop: '2em'}}>Have account ? <span>Login</span></p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp
