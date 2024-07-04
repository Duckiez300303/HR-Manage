import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EmpSalary = () => {
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
          <h2>Salary List</h2>
          </div>
        <div className='mt-3'></div>
        <table className='table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Hours Worked</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deduction</th>
              <th>Salary($)</th>
             </tr>
          </thead>
          <tbody>
          {
    workshift.map(w => {
      // Convert the times to Date objects
      const startTime = new Date(`1970-01-01T${w.startTime}Z`);
      const endTime = new Date(`1970-01-01T${w.endTime}Z`);
      // Get the hours
      const startHours = startTime.getUTCHours();
      const endHours = endTime.getUTCHours();
      const job = w.job;
      var allowances = w.allowances;
      var deductions = w.deductions;
      var basicSalary = w.salary;
      // Subtract the start time from the end time
      const hoursDifference = endHours - startHours;
      var Salary = hoursDifference * basicSalary + allowances - deductions;
  
      return (
        <React.Fragment key={w.shiftID}>
          <tr>
            <td>{new Date(w.shiftDate).toISOString().slice(0, 10)}</td>
            <td>{w.startTime}</td>
            <td>{w.endTime}</td>
            <td>{hoursDifference}</td>
            <td>{basicSalary}</td>
            <td>{allowances}</td>
            <td>{deductions}</td>
            <td>{Salary}</td>
            <td>
              <div className='d-flex justify-content-between'>
              </div>
            </td>
          </tr>
        </React.Fragment>
      );
    })
  }
          </tbody>
        </table>
      </div>
    )
  };

export default EmpSalary