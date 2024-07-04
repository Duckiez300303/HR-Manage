import React, { useEffect, useState } from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom";
import axios from 'axios'
const ManageWorkshift = () => {
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
  
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h2>Shift List</h2>
      </div>
      <Link to = "/dashboard/add_workshift" className='btn btn-success'>Add Shift</Link>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Assigned Employees</th>
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
              {/* <td>{w.eid}</td> */}
              <td>
                <div className='d-flex justify-content-between'>
                  <div>
                    <Link to = {'/dashboard/display_Emp_Shift/' + w.shiftID} className='btn btn-primary btn-sm ms-2'>Show</Link>
                  </div>
                  <div>
                    <Link to = {'/dashboard/edit_workshift/' + w.shiftID} className='btn btn-warning btn-sm ms-2'>Edit</Link>
                  </div>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))
      }
    </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageWorkshift