import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from "react-router-dom";
import axios from 'axios'

const DisplayEmpCate = () => {
  const [employee, setEmployee] = useState([])
  const navigate = useNavigate()
  const { id } = useParams();
  useEffect(() => {
    axios.get('http://localhost:8000/auth/employee')
    .then(result => {
      if(result.data.Status){
        const filteredEmployees = result.data.Result.filter(e => e.cateID === Number(id));
        setEmployee(filteredEmployees);
      } else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }, [id]) 

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h2>Employee List</h2>
        </div>
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
};

export default DisplayEmpCate