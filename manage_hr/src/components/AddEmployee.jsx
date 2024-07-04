import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        yearOfBirth: '',
        nationality: '',
        phoneNum: '',
        address: '',
        cateId: '',
        job: ''
    })

        const [category, setCategory] = useState([])
      
        useEffect(() => {
          axios.get('http://localhost:8000/auth/category')
          .then(result => {
            if(result.data.Status){
              setCategory(result.data.Result);
            } else {
              alert(result.data.Error)
            }
          }).catch(err => console.log(err))
        }, [])

        const handleSubmit = (e) => {
            e.preventDefault()
            axios.post('http://localhost:8000/auth/add_employee', employee)
            .then(result => {
                if(result.data.Status){
                    navigate('/dashboard/employee')
                    alert('Add Employee successfully')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
        <div className='p-3 rounded w-50 border'>
            <h2 className='text-center'>Add Employee</h2>
            <form className='row g-1' onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='Name'><strong>Name:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputName' placeholder='Enter Name'
                    onChange={(e) =>setEmployee({...employee,name:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='email'><strong>Email:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputEmail' placeholder='Enter email'
                    onChange={(e) =>setEmployee({...employee,email:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='Password'><strong>Password:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputPassword' autoComplete='off' placeholder='Enter Password'
                    onChange={(e) =>setEmployee({...employee,password:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='yearOfBirth'><strong>Year Of Birth:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputyearOfBirth' placeholder='Enter Year Of Birth'
                    onChange={(e) =>setEmployee({...employee,yearOfBirth:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='nationality'><strong>Nationality:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputNationality' placeholder='Enter nationality'
                    onChange={(e) =>setEmployee({...employee,nationality:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='phone number'><strong>Phone Number:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputPhoneNum' placeholder='Enter phone number'
                    onChange={(e) =>setEmployee({...employee,phoneNum:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='address'><strong>Address:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputAddress' placeholder='Enter address'
                    onChange={(e) =>setEmployee({...employee,address:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='job'><strong>Job:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputJob' placeholder='Enter job'
                    onChange={(e) =>setEmployee({...employee,job:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='category'><strong>Category:</strong></label>
                    <select name='category' id ='category' className='form-select'
                    onChange={(e) =>setEmployee({...employee,cateId:e.target.value})}>
                        {category.map(c => {
                            return <option value={c.id}>{c.cateName}</option>;
                        })}
                    </select>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add Employee</button>  
            </form>
        </div>
    </div>
  )
}

export default AddEmployee