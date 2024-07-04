import React, { useEffect, useState } from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom";
import axios from 'axios'

const Employee = () => {
  const [employee, setEmployee] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:8000/auth/employee')
    .then(result => {
      if(result.data.Status){
        setEmployee(result.data.Result);
      } else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }, [])  

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
        axios.delete('http://localhost:8000/auth/delete_employee/' + id)
        .then(result => {
            if(result.data.Status){
                alert('Delete Employee successfully')
                window.location.reload()
            } else {
                alert(result.data.Error)
            }
        })
    }
}
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h2>Employee List</h2>
        </div>
        <Link to = '/dashboard/add_employee' className = 'btn btn-success'>
          Add Employee
        </Link>
      <div className='mt-3'></div>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Nationality</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Job</th>
           </tr>
        </thead>
        <tbody>
          {
            employee.map(e => {
              const currentYear = new Date().getFullYear();
              const age = currentYear - e.yob;
          
              return (
                <tr>
                  <td>{e.name}</td>
                  <td>{age}</td>
                  <td>{e.email}</td>
                  <td>{e.nationality}</td>
                  <td>{e.phoneNum}</td>
                  <td>{e.address}</td>
                  <td>{e.job}</td>
                  <td>
                    <div className='d-flex justify-content-between'>
                      <div>
                    <Link to = {'/dashboard/edit_employee/' + e.eid} className='btn btn-warning btn-sm ms-2'>Edit</Link>
                      </div>
                      <div style={{ width: '30px' }}></div>
                      <div>
                    <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(e.eid)}>Delete</button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Employee;