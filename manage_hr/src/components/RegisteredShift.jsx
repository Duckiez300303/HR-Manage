import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios'

const RegisteredShift = () => {
    const [workshift, setworkshift] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8000/auth/workshift2')
      .then(result => {
        if(result.data.Status){
          setworkshift(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
    }, [])
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
        <h2>Your Shift</h2>
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
          <React.Fragment key={w.eid}>
            <tr>
              <td>{new Date(w.shiftDate).toISOString().slice(0, 10)}</td>
              <td>{w.startTime}</td>
              <td>{w.endTime}</td>
              <td>
                <div classDate='d-flex justify-content-between'>
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

export default RegisteredShift