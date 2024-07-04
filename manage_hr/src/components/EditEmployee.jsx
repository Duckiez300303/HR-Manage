import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'


const EditEmployee = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        name: '',
        yearOfBirth: '',
        email: '',
        nationality: '',
        phoneNum: '',
        address: '',
        job:'',
        cateId: ''
    });
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
        useEffect(() => {
        axios.get('http://localhost:8000/auth/category')
            .then(result => {
              if(result.data.Status){
                setCategory(result.data.Result);
              } else {
                alert(result.data.Error)
              }
            }).catch(err => console.log(err))


        axios.get('http://localhost:8000/auth/category')
        .then(result => {
            if(result.data.Status){
              setEmployee({
                ...employee,
                name:result.data.Result[0].name,
                yearOfBirth: result.data.Result[0].yearOfBirth,
                email: result.data.Result[0].email,
                nationality: result.data.Result[0].nationality,
                phoneNum: result.data.Result[0].phoneNum,
                address: result.data.Result[0].address,
                job: result.data.Result[0].job,
                cateId: result.data.Result[0].cateId
              });
            } else {
              alert(result.data.Error)
            }
          }).catch(err => console.log(err))

          axios.get('http://localhost:8000/auth/employee/' + id)
          .then(result => {
            if(result.data.Status){ 
                
            } else {
              alert(result.data.Error)
            }
          }).catch(err => console.log(err))
        }, [])

        const handleSubmit = (e) => {
            e.preventDefault()
            axios.put('http://localhost:8000/auth/edit_employee/' + id, employee)
            .then(result => {
                if(result.data.Status){
                    alert('Edit Employee successfully')
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
        <div className='p-3 rounded w-50 border'>
            <h2 className='text-center'>Edit Employee</h2>
            <form className='row g-1' onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='Name'><strong>Name:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputName' placeholder='Enter Name' value={employee.name}
                    onChange={(e) =>setEmployee({...employee,name:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='yearOfBirth'><strong>Year Of Birth:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputyearOfBirth' placeholder='Enter Year Of Birth' 
                    value={employee.yearOfBirth}
                    onChange={(e) =>setEmployee({...employee,yearOfBirth:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='email'><strong>Email:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputEmail' placeholder='Enter email' 
                    value={employee.email}
                    onChange={(e) =>setEmployee({...employee,email:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='nationality'><strong>Nationality:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputNationality' placeholder='Enter nationality' 
                    value={employee.nationality}
                    onChange={(e) =>setEmployee({...employee,nationality:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='phone number'><strong>Phone Number:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputPhoneNum' placeholder='Enter phone number'
                    value={employee.phoneNum}
                    onChange={(e) =>setEmployee({...employee,phoneNum:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='address'><strong>Address:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputAddress' placeholder='Enter address'
                    value={employee.address}
                    onChange={(e) =>setEmployee({...employee,address:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='job'><strong>Job:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputJob' placeholder='Enter job'
                    value={employee.job}
                    onChange={(e) =>setEmployee({...employee,job:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='category'><strong>Category:</strong></label>
                    <select name='category' id ='category' className='form-select'
                    value={employee.cateId}
                    onChange={(e) =>setEmployee({...employee,cateId:e.target.value})}>
                        {category.map(c => {
                            return <option value={c.id}>{c.cateName}</option>;
                        })}
                    </select>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Edit Employee</button>  
            </form>
        </div>
    </div>
  )
}

export default EditEmployee