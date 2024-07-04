import React, { useEffect, useState } from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom";
import axios from 'axios'
const ViewShift = () => {
  const [workshift, setworkshift] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/auth/workshift')
    .then(result => {
      if(result.data.Status){
        setworkshift(result.data.Result);
      } else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8000/auth/', values)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/manageWorkshift')
            alert('Work shift added successfully!')
        } else {
            setError(result.data.Error)
            alert('Work shift added failed!')
        }
    })
    .catch(err=> console.log(err))
  }
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h2>Shift List</h2>
      </div>
      <div className='mt-3'></div>
      <table className='table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
           </tr>
          </thead>
          <tbody>
          
      {
        workshift.map(w =>(
          <React.Fragment key={w.shiftID}>
            <tr>
              <td>{new Date(w.shiftDate).toISOString().slice(0, 10)}</td>
              <td>{w.startTime}</td>
              <td>{w.endTime}</td>
              <td>
                <div classDate='d-flex justify-content-between'>
                <Link to="/employee_dashboard/registeredShift/1" className='btn btn-success'>Apply</Link>
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
}


export default ViewShift