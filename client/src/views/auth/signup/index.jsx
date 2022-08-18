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
  birthday:"",
  gender:"",
  role:"",
}

const schema = Yup.object().shape({
  username: Yup.string().required("Enter valid username").max(20).min(2),
  password: Yup.string().required("Enter valid password").max(25).min(5),
  firstname: Yup.string().required("Enter valid name").max(25).min(5),
  lastname: Yup.string().required("Enter valid name").max(25).min(5),
  phone: Yup.number().required("Enter valid phone number"),
  birthday: Yup.date().required("Enter valid birth day"),
  gender: Yup.string().required("Choose gender"),
  role: Yup.string().required("Select role")
})

const formik = useFormik({
  initialValues,
  validationSchema: schema
})

const { handleChange, values, errors, touched, getFieldProps, isValid  } = formik
const handleRadioButtons = e => formik.values.gender= e.target.value
const [isChecked, setIsChecked] = useState(false)

const handleAgreeToTerms = ()=>{
  console.log(isChecked)
  setIsChecked(!isChecked);
}
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
          <h1>Responsive Registration Form</h1>
          {/* Username */}
          <input name='username' type="text" placeholder="Username"
          {...getFieldProps('username')}
          style={errors.username && touched.username ? errorInputStyle : {}}
          />
          { touched.username && errors.username && <label>{errors.username}</label>}

          {/* Password */}
          <input name='password' type="password" placeholder="Password" 
          {...getFieldProps('password')}
          style={ errors.password && touched.password ? errorInputStyle : {}}
          />
          { touched.password && errors.password && <label>{errors.password}</label>}
          <div className='names'>
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
          </div>
          {/* Phone Number */}
          <input name='phone' type="text" placeholder="Phone Number" 
          {...getFieldProps('phone')}
          style={errors.phone && touched.phone ? errorInputStyle: {}}
          />
          { touched.phone && errors.phone && <label>{errors.phone}</label>}

          {/* Birth Day */}
          <input name='birthday' type="date" required
          {...getFieldProps('birthday')}
          style={errors.birthday && touched.birthday ? errorInputStyle: {}}
          /><br/>
          { touched.birthday && errors.birthday&& <label>{errors.birthday}</label>}
          
          {/* Gender */}
          <div className='gender'>
            <div className='genderOption'>
              <input 
                type="radio" 
                id="male"
                name="gender" 
                value="male" 
                onChange={e => handleRadioButtons(e)}
                required
              />
              <label className='label1' htmlFor="male">Male</label>
            </div>

            <div className='genderOption'>
              <input 
                type="radio" 
                id="female"
                name="gender" 
                value="female" 
                onChange={e => handleRadioButtons(e)}
              />
              <label className='label2' htmlFor="two">Female</label>
            </div>
          </div>
          {/* Roles */}
          <select 
          {...getFieldProps('role')}
          style={errors.role && touched.role? errorInputStyle: {}}
          >
            <option>Select Role</option>
            <option>Admin</option>
            <option>Patient</option>
            <option>Physician</option>
            <option>Pharmacists</option>
          </select>
          { touched.role && errors.role&& <label>{errors.role}</label>}

          {/* Conditions */}
          <div className="conditions">
            <div>
              <input type="checkbox" onChange={handleAgreeToTerms}/>
              <label htmlFor="terms"> I agree with terms and conditions</label>
            </div>
            <div>
              <input type="checkbox" id="newsletter"/>
              <label htmlFor="newsletter"> I want to receive newsletter </label>
            </div>
          </div>

          {/* Submit */}
          <button 
          type='submit' 
          disabled={!isChecked}
          // disabled={!isValid || Object.values(touched).every(e => e === '')}
          // style={ !isChecked || Object.values(touched).every(e => e === '') ? {backgroundColor: '#ccc'} : {}}
          onClick = {handleSubmit}
          >Register</button>

          
          <Link to='/'>
              <p style={{marginTop: '2em'}}>Have account already? <span>Login</span></p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp
