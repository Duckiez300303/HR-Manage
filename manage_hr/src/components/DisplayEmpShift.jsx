import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from "react-router-dom";
import axios from 'axios'

const DisplayEmpShift = () => {
  const [employee, setEmployee] = useState([])
  const { id } = useParams();
  useEffect(() => {
    axios.get('http://localhost:8000/auth/employee2/' + id)
    .then(result => {
      if(result.data.Status){
        const filteredEmployees = result.data.Result.filter(d => d.shiftID === Number(id));
        console.log(id)
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
            <th>Email</th>
            <th>Phone Number</th>
            <th>Job</th>
           </tr>
        </thead>
        <tbody>
          {
            employee.map(w =>(
              <React.Fragment key={w.shiftID}>
                <tr>
                  <td>{w.name}</td>
                  <td>{w.email}</td>
                  <td>{w.phoneNum}</td>
                  <td>{w.job}</td>
                  <td>
                    <div className='d-flex justify-content-between'>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))
          }
        </tbody>
      </table>
    </div>
  )
};

export default DisplayEmpShift