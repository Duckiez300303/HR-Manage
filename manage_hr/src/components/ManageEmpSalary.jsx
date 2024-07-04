import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'


const ManageEmpSalary = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        salary:'',
        allowances:'',
        deductions:''
    });
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
        useEffect(() => {
        axios.get('http://localhost:8000/auth/employee')
            .then(result => {
              if(result.data.Status){
                setCategory(result.data.Result);
              } else {
                alert(result.data.Error)
              }
            }).catch(err => console.log(err))


        axios.get('http://localhost:8000/auth/employee')
        .then(result => {
            if(result.data.Status){
              setEmployee({
                ...employee,
                salary: result.data.Result[0].salary,
                allowances:result.data.Result[0].allowances,
                deductions: result.data.Result[0].deductions
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
            axios.put('http://localhost:8000/auth/edit_salary/' + id, employee)
            .then(result => {
                if(result.data.Status){
                    alert('Edit Salary successfully')
                    navigate('/dashboard/specSal/' + id)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
        <div className='p-3 rounded w-50 border'>
            <h2 className='text-center'>Edit Salary</h2>
            <form className='row g-1' onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='basicSalary'><strong>Basic Salary:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputBasicSalary' placeholder='Enter Basic Salary:' 
                    onChange={(e) =>setEmployee({...employee,salary:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='Allowances'><strong>Allowances:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputyearOfBirth' placeholder='Enter Allowances' 
                    onChange={(e) =>setEmployee({...employee,allowances:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='deductions'><strong>Deductions:</strong></label>
                    <input type='text' className='form-control rounded-0' name='inputDeductions' placeholder='Enter Deductions' 
                    onChange={(e) =>setEmployee({...employee,deductions:e.target.value})}/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Confirm</button>  
            </form>
        </div>
    </div>
  )
}

export default ManageEmpSalary