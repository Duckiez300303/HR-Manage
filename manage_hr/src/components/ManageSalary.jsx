import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'

const ManageSalary = () => {
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

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h2>Wages System</h2>
        </div>
      <div className='mt-3'></div>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
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
                  <td>{e.job}</td>
                  <td>
                    <div className='d-flex justify-content-between'>
                      <div>
                    <Link to = {'/dashboard/specSal/' + e.eid} className='btn btn-warning btn-sm ms-2'>Manage Salary</Link>
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

export default ManageSalary