import React, { useState, useRef } from 'react'
import './Style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import emailjs from 'emailjs-com'


const SignUp = () => {
    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials=true;

    const form = useRef();
    const sendEmail = (e) => {
        emailjs.sendForm('service_yuq8vja', 'template_yu0dnaf', form.current, '6m-XE1Jf37B055reQ')
        .then(res => console.log('email sent successfully'))
        .catch(err => console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8000/emp/signup', values)
        .then(result => {
            if(result.data.registerStatus) {
                navigate('/employee_login')
                sendEmail();
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err=> console.log(err))
    }

    return (
            <div className='display-f justify-content-center align-items-center vh-100 loginPage'>
                <div className='p-3 rounded w-25 border loginForm'>
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <h2 className='signUpTitle'>Register</h2>
                    <form ref={form} onSubmit={handleSubmit}>
                        <div className ='mb-3'>
                            <label htmlFor='email'><strong>Email:</strong></label>
                            <input type="email" name = 'email' autoComplete='off' placeholder='Enter Email'
                            onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0' />
                        </div>
                        <div className ='mb-3'>
                            <label htmlFor='username'><strong>Username:</strong></label>
                            <input type="username" name = 'username' autoComplete='off' placeholder='Enter Username'
                            onChange={(e) => setValues({...values, username : e.target.value})} className='form-control rounded-0' />
                        </div>
                        <div className ='mb-3'>
                            <label htmlFor='password'><strong>Password:</strong></label>
                            <input type="password" name = 'password' autoComplete='off' placeholder='Enter Password'
                            onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0' />
                        </div>
                        <div className ='mb-3'>
                            <label htmlFor='password2'><strong>Confirm-Password:</strong></label>
                            <input type="password" name = 'password2' autoComplete='off' placeholder='Enter Password'
                            onChange={(e) => setValues({...values, password2 : e.target.value})} className='form-control rounded-0' />
                        </div>
                        <button className='btn btn-success w-100 rounded-0'>Sign Up</button>
                        <div className ='mb-3'>
                            <input type = 'checkbox' name='checkbox' id='checkbox'
                            onChange={(e) => setValues({...values, checkbox : e.target.value})} />
                            <label htmlFor='checkbox'>You are Agree with terms & conditions</label>
                        </div>
                    </form>
                </div>
            </div>
    )
}
    
export default SignUp